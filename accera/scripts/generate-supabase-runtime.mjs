import { mkdirSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';

const root = process.cwd();
const supabase = join(root, 'supabase');
const write = (file, contents) => {
  mkdirSync(dirname(file), { recursive: true });
  writeFileSync(file, contents.trimStart());
};

write(join(supabase, 'functions/_shared/types.ts'), `export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export type AuthenticatedActor = { id: string; email?: string };
export type RequestContext<T> = { request: Request; actor: AuthenticatedActor; input: T; correlationId: string };
export type Operation<T> = {
  name: string;
  parse: (value: unknown) => T;
  execute: (context: RequestContext<T>) => Promise<unknown>;
};
`);
write(join(supabase, 'functions/_shared/cors.ts'), `const allowedOrigins = new Set((Deno.env.get('ALLOWED_ORIGINS') ?? '').split(',').filter(Boolean));

export function corsHeaders(request: Request): HeadersInit {
  const origin = request.headers.get('origin');
  const allowedOrigin = !origin || allowedOrigins.size === 0 || allowedOrigins.has(origin) ? (origin ?? '*') : 'null';
  return { 'access-control-allow-origin': allowedOrigin, 'access-control-allow-headers': 'authorization, content-type, idempotency-key, x-correlation-id', 'access-control-allow-methods': 'POST, OPTIONS', vary: 'Origin' };
}
`);
write(join(supabase, 'functions/_shared/errors.ts'), `export class AppError extends Error {
  constructor(public readonly status: number, public readonly code: string, message: string, public readonly details?: unknown) { super(message); }
}
export const unauthorized = () => new AppError(401, 'unauthorized', 'Authentication is required.');
export const forbidden = () => new AppError(403, 'forbidden', 'You are not permitted to perform this operation.');
export const validationError = (details: unknown) => new AppError(422, 'validation_error', 'The request is invalid.', details);
`);
write(join(supabase, 'functions/_shared/auth.ts'), `import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';
import { unauthorized } from './errors.ts';
import type { AuthenticatedActor } from './types.ts';

export async function authenticate(request: Request): Promise<AuthenticatedActor> {
  const authorization = request.headers.get('authorization');
  if (!authorization?.startsWith('Bearer ')) throw unauthorized();
  const url = Deno.env.get('SUPABASE_URL');
  const key = Deno.env.get('SUPABASE_ANON_KEY');
  if (!url || !key) throw new Error('Supabase runtime configuration is missing.');
  const client = createClient(url, key, { global: { headers: { Authorization: authorization } }, auth: { persistSession: false, autoRefreshToken: false } });
  const { data, error } = await client.auth.getUser();
  if (error || !data.user) throw unauthorized();
  return { id: data.user.id, email: data.user.email };
}
`);
write(join(supabase, 'functions/_shared/permissions.ts'), `import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';
import { forbidden } from './errors.ts';

export async function requireOrganisationPermission(token: string, organisationId: string, permission: string) {
  const url = Deno.env.get('SUPABASE_URL'); const key = Deno.env.get('SUPABASE_ANON_KEY');
  if (!url || !key) throw new Error('Supabase runtime configuration is missing.');
  const client = createClient(url, key, { global: { headers: { Authorization: token } }, auth: { persistSession: false, autoRefreshToken: false } });
  const { data, error } = await client.rpc('has_organisation_permission', { target_organisation_id: organisationId, required_permission: permission });
  if (error || data !== true) throw forbidden();
}
`);
write(join(supabase, 'functions/_shared/validation.ts'), `import { validationError } from './errors.ts';
export function object(value: unknown): Record<string, unknown> { if (!value || typeof value !== 'object' || Array.isArray(value)) throw validationError([{ path: '$', message: 'Expected an object.' }]); return value as Record<string, unknown>; }
export function string(value: unknown, field: string): string { if (typeof value !== 'string' || value.trim() === '') throw validationError([{ path: field, message: 'Expected a non-empty string.' }]); return value.trim(); }
export function uuid(value: unknown, field: string): string { const result = string(value, field); if (!/^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(result)) throw validationError([{ path: field, message: 'Expected a UUID.' }]); return result; }
`);
write(join(supabase, 'functions/_shared/response.ts'), `import { AppError } from './errors.ts';
export function success(data: unknown, correlationId: string, status = 200): Response { return Response.json({ data, meta: { correlationId } }, { status }); }
export function failure(error: unknown, correlationId: string): Response { const appError = error instanceof AppError ? error : new AppError(500, 'internal_error', 'An unexpected error occurred.'); return Response.json({ error: { code: appError.code, message: appError.message, details: appError.details }, meta: { correlationId } }, { status: appError.status }); }
`);
write(join(supabase, 'functions/_shared/logging.ts'), `export function log(level: 'info' | 'warn' | 'error', event: string, fields: Record<string, unknown> = {}) { console[level](JSON.stringify({ level, event, timestamp: new Date().toISOString(), ...fields })); }
`);
write(join(supabase, 'functions/_shared/handler.ts'), `import { authenticate } from './auth.ts';
import { corsHeaders } from './cors.ts';
import { AppError, validationError } from './errors.ts';
import { log } from './logging.ts';
import { failure, success } from './response.ts';
import type { Operation } from './types.ts';

export function serve<T>(operation: Operation<T>): (request: Request) => Promise<Response> {
  return async (request) => {
    const correlationId = request.headers.get('x-correlation-id') ?? crypto.randomUUID();
    const headers = corsHeaders(request);
    if (request.method === 'OPTIONS') return new Response(null, { status: 204, headers });
    try {
      if (request.method !== 'POST') throw new AppError(405, 'method_not_allowed', 'Use POST.');
      const actor = await authenticate(request);
      let payload: unknown;
      try { payload = await request.json(); } catch { throw validationError([{ path: '$', message: 'Expected JSON.' }]); }
      const data = await operation.execute({ request, actor, input: operation.parse(payload), correlationId });
      log('info', 'edge_function_succeeded', { operation: operation.name, actorId: actor.id, correlationId });
      return success(data, correlationId, 200);
    } catch (error) {
      log(error instanceof AppError && error.status < 500 ? 'warn' : 'error', 'edge_function_failed', { operation: operation.name, correlationId, code: error instanceof AppError ? error.code : 'internal_error' });
      return failure(error, correlationId);
    }
  };
}
`);

const operations = {
  'auth/create-profile': 'Creates the profile after an authenticated identity is available.', 'auth/sync-user': 'Synchronizes provider identity with the application profile.', 'auth/verify-role': 'Returns the actor’s effective role and access context.', 'auth/manage-session': 'Performs a server-side session security operation.',
  'users/get-user': 'Retrieves the authorized actor profile.', 'users/update-user': 'Updates permitted profile attributes.', 'users/delete-user': 'Starts controlled deletion/deactivation.', 'users/search-users': 'Searches users within permission/privacy constraints.',
  'organisations/create-organisation': 'Creates an organisation and initial owner membership.', 'organisations/update-organisation': 'Updates authorised organisation fields.', 'organisations/invite-member': 'Creates an organisation invitation.', 'organisations/remove-member': 'Removes or deactivates membership.', 'organisations/switch-organisation': 'Validates an active organisation context switch.',
  'facilities/create-facility': 'Creates a facility and baseline resources.', 'facilities/update-facility': 'Updates facility configuration.', 'facilities/manage-availability': 'Changes facility/resource availability.', 'facilities/facility-summary': 'Returns an authorised facility operational summary.',
  'bookings/create-booking': 'Creates an idempotent booking after availability validation.', 'bookings/cancel-booking': 'Cancels a booking under policy.', 'bookings/confirm-booking': 'Confirms an eligible booking.', 'bookings/check-availability': 'Checks resource availability.', 'bookings/check-in': 'Records an authorised check-in.',
  'academy/create-program': 'Creates an academy program.', 'academy/enroll-athlete': 'Enrolls an athlete under eligibility/capacity rules.', 'academy/record-attendance': 'Records attendance with attribution.', 'academy/submit-assessment': 'Stores an assessment.', 'academy/progression-summary': 'Produces a progression summary.',
  'competition/create-competition': 'Creates competition configuration.', 'competition/register-participant': 'Registers a participant idempotently.', 'competition/generate-draw': 'Generates a draw from valid entries.', 'competition/generate-schedule': 'Generates schedule constraints.', 'competition/record-score': 'Records attributed score data.', 'competition/finalize-result': 'Finalizes a validated result.', 'competition/competition-summary': 'Returns an authorised competition summary.',
  'rankings/calculate-ranking': 'Calculates ranking impact from a validated result.', 'rankings/recalculate-rankings': 'Recalculates a defined ranking population.', 'rankings/ranking-history': 'Returns ranking history.', 'rankings/ranking-summary': 'Returns ranking summary.',
  'payments/create-payment': 'Creates provider-independent, idempotent payment intent.', 'payments/verify-payment': 'Verifies authoritative provider state.', 'payments/refund-payment': 'Initiates a permitted refund.', 'payments/payment-status': 'Returns payment status.',
  'commerce/create-order': 'Creates an order from an approved cart.', 'commerce/update-order': 'Updates an eligible order.', 'commerce/reserve-inventory': 'Reserves inventory atomically.', 'commerce/fulfill-order': 'Transitions an order into fulfillment.', 'commerce/cancel-order': 'Cancels an order and releases inventory.',
  'sponsorship/create-campaign': 'Creates sponsorship campaign.', 'sponsorship/manage-contract': 'Manages contract lifecycle.', 'sponsorship/record-deliverable': 'Records evidence of deliverable completion.', 'sponsorship/campaign-report': 'Returns campaign reporting data.',
  'performance/record-metric': 'Records an attributed athlete metric.', 'performance/record-training': 'Records training activity.', 'performance/record-test': 'Records a formal performance test.', 'performance/match-analysis': 'Stores structured match analysis.', 'performance/athlete-report': 'Generates an athlete report.',
  'notifications/send-notification': 'Queues a notification for one authorised recipient.', 'notifications/broadcast-notification': 'Queues an authorised audience broadcast.', 'notifications/notification-preferences': 'Reads or updates notification preferences.',
  'analytics/track-event': 'Records an approved analytics event.', 'analytics/generate-report': 'Generates an approved report.', 'analytics/dashboard-metrics': 'Returns authorised aggregated dashboard metrics.',
  'webhooks/payments': 'Receives payment provider callbacks.', 'webhooks/commerce': 'Receives commerce/fulfillment callbacks.', 'webhooks/notifications': 'Receives notification provider callbacks.', 'webhooks/integrations': 'Receives a controlled partner callback.'
};
for (const [name, description] of Object.entries(operations)) {
  const file = join(supabase, 'functions', name, 'index.ts');
  const shared = name.split('/').length === 2 ? '../../_shared' : '../../../_shared';
  write(file, `/** ${description} Implement domain-specific state transitions here; do not bypass the shared boundary. */
import { serve } from '${shared}/handler.ts';
import { object } from '${shared}/validation.ts';
import { AppError } from '${shared}/errors.ts';

Deno.serve(serve({
  name: '${name}',
  parse: object,
  execute: async ({ input, actor, correlationId }) => {
    // This explicit fail-closed contract prevents an unfinished function from
    // mutating data without validation, permission checks, audit and tests.
    throw new AppError(501, 'operation_not_implemented', '${description}', { actorId: actor.id, correlationId, acceptedInputKeys: Object.keys(input) });
  }
}));
`);
}

const seed = {
  'development/001_reference_data.sql': `insert into public.organisation_types (code, name) values ('club', 'Club'), ('academy', 'Academy'), ('facility', 'Facility'), ('federation', 'Federation'), ('business', 'Business') on conflict (code) do nothing;
insert into public.roles (code, name, is_system) values ('platform_admin', 'Platform administrator', true), ('player', 'Player', true), ('coach', 'Coach', true), ('official', 'Official', true) on conflict (code) do nothing;
insert into public.permissions (code, description) values ('organisation.manage', 'Manage organisation configuration'), ('facility.manage', 'Manage facilities and availability'), ('competition.manage', 'Manage competitions'), ('finance.manage', 'Manage finance'), ('academy.manage', 'Manage academy operations') on conflict (code) do nothing;`,
  'development/002_users.sql': `-- Create development identities through the Supabase Auth Admin API or test setup. Do not insert password hashes or tokens in seed SQL.`,
  'development/003_organisations.sql': `-- Development organisations are created by integration fixtures after Auth users exist; preserve the organisation -> owner membership invariant.`,
  'development/004_sports.sql': `insert into public.sports (name, slug) values ('Football', 'football'), ('Basketball', 'basketball'), ('Tennis', 'tennis'), ('Athletics', 'athletics') on conflict (slug) do nothing;`,
  'development/005_facilities.sql': `-- Create facilities through fixtures after organisations are created; no fixture may bypass RLS or booking constraints.`,
  'development/006_academy.sql': `-- Create academy fixtures only after sport, organisation, facility and athlete dependencies exist.`,
  'development/007_competitions.sql': `-- Create competition fixtures only after categories, registrations and facility resources exist.`,
  'staging/001_reference_data.sql': `insert into public.organisation_types (code, name) values ('club', 'Club'), ('academy', 'Academy'), ('facility', 'Facility'), ('federation', 'Federation'), ('business', 'Business') on conflict (code) do nothing;`,
  'staging/002_test_accounts.sql': `-- Test accounts are provisioned by the protected staging test harness, never committed as credentials.`,
  'production/001_reference_data.sql': `insert into public.organisation_types (code, name) values ('club', 'Club'), ('academy', 'Academy'), ('facility', 'Facility'), ('federation', 'Federation'), ('business', 'Business') on conflict (code) do nothing;`,
  'production/002_system_configuration.sql': `-- Production bootstrap is deliberately limited to approved reference data. System secrets and users are provisioned outside SQL seeds.`
};
for (const [path, contents] of Object.entries(seed)) write(join(supabase, 'seed', path), `${contents}\n`);

write(join(supabase, 'types/database.ts'), `/**
 * GENERATED OUTPUT CONTRACT
 * Regenerate after applying migrations with:
 *   supabase gen types typescript --local --schema public > supabase/types/database.ts
 * Do not add application logic to this file.
 */
export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];
export type Database = { public: { Tables: Record<string, { Row: Record<string, unknown>; Insert: Record<string, unknown>; Update: Record<string, unknown>; Relationships: []; }>; Views: Record<string, { Row: Record<string, unknown> }>; Functions: Record<string, { Args: Record<string, unknown>; Returns: unknown }>; Enums: Record<string, string>; CompositeTypes: Record<string, never>; }; };
`);
write(join(supabase, 'types/enums.ts'), `/** Generated enum boundary; regenerate alongside database.ts. */
export type RecordStatus = 'active' | 'inactive' | 'archived' | 'deleted';
export type BookingStatus = 'pending' | 'confirmed' | 'cancelled' | 'completed' | 'no_show';
export type TransactionStatus = 'pending' | 'authorized' | 'settled' | 'failed' | 'refunded' | 'void';
`);
write(join(supabase, 'types/functions.ts'), `/** Generated RPC boundary; regenerate from the applied database. */
export type HasOrganisationPermissionArgs = { target_organisation_id: string; required_permission: string };
`);
write(join(supabase, 'types/views.ts'), `/** Generated view boundary. No reporting views are defined in the baseline migrations. */
export type DatabaseViews = Record<never, never>;
`);
