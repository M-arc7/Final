import { mkdirSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';

const root = join(process.cwd(), 'packages/core');
const write = (path, content) => { mkdirSync(dirname(path), { recursive: true }); writeFileSync(path, content.trimStart()); };
const pascal = (value) => value.split('-').map((part) => part[0].toUpperCase() + part.slice(1)).join('');

write(join(root, 'shared/primitives.ts'), `/** Technology-independent core primitives. */
export type Brand<T, Name extends string> = T & { readonly __brand: Name };
export type EntityStatus = 'active' | 'inactive' | 'suspended' | 'deleted';
export type Metadata = Readonly<Record<string, unknown>>;
export type Timestamped = Readonly<{ createdAt: Date; updatedAt: Date }>;
export const newId = <Name extends string>(value = crypto.randomUUID()) => value as Brand<string, Name>;
`);
write(join(root, 'shared/errors.ts'), `/** Domain errors never encode HTTP status or transport response shape. */
export class CoreError extends Error {
  constructor(readonly code: string, message: string, readonly context: Readonly<Record<string, unknown>> = {}) { super(message); this.name = 'CoreError'; }
}
export const invariant = (condition: unknown, code: string, message: string, context: Readonly<Record<string, unknown>> = {}): asserts condition => { if (!condition) throw new CoreError(code, message, context); };
`);
write(join(root, 'shared/repository.ts'), `/** Persistence port; adapters may use Supabase, but no query implementation belongs here. */
export interface Repository<Id, Record> { findById(id: Id): Promise<Record | null>; insert(record: Record): Promise<Record>; replace(record: Record): Promise<Record>; delete(id: Id): Promise<void>; }
`);
write(join(root, 'shared/rules.ts'), `import type { EntityStatus } from './primitives';
export const canTransitionStatus = (from: EntityStatus, to: EntityStatus): boolean => from !== 'deleted' && (from !== to || to === 'deleted');
`);
write(join(root, 'shared/index.ts'), `export * from './primitives';
export * from './errors';
export * from './repository';
export * from './rules';
`);

const modules = [
  ['identity/account', 'account'], ['identity/authentication', 'authentication', ['providers', 'errors']], ['identity/sessions', 'session'], ['identity/devices', 'device'], ['identity/verification', 'verification', ['tokens']],
  ['organisations/organisations', 'organisation'], ['organisations/organisation-types', 'organisation-type'], ['organisations/organisation-members', 'organisation-member'], ['organisations/organisation-settings', 'organisation-setting'], ['organisations/organisation-hierarchy', 'organisation-hierarchy'],
  ['users/users', 'user'], ['users/user-settings', 'user-setting'], ['users/user-preferences', 'user-preference'], ['users/user-status', 'user-status'], ['users/user-verification', 'user-verification'],
  ['profiles/personal', 'personal-profile'], ['profiles/public', 'public-profile'], ['profiles/professional', 'professional-profile'], ['profiles/social', 'social-profile'],
  ['roles/system-roles', 'system-role'], ['roles/organisation-roles', 'organisation-role'], ['roles/role-definitions', 'role-definition'], ['roles/role-assignments', 'role-assignment'],
  ['permissions/permissions', 'permission'], ['permissions/permission-groups', 'permission-group'], ['permissions/permission-checks', 'permission-check', [], true], ['permissions/access-policies', 'access-policy'],
  ['memberships/memberships', 'membership'], ['memberships/membership-types', 'membership-type'], ['memberships/plans', 'membership-plan'], ['memberships/entitlements', 'entitlement'], ['memberships/renewals', 'membership-renewal'],
  ['notifications/notification-types', 'notification-type'], ['notifications/notification-preferences', 'notification-preference'], ['notifications/notification-delivery', 'notification-delivery'], ['notifications/notification-status', 'notification-status'],
  ['messaging/conversations', 'conversation'], ['messaging/messages', 'message'], ['messaging/participants', 'participant'], ['messaging/attachments', 'message-attachment'], ['messaging/moderation', 'moderation-case'],
  ['files/uploads', 'upload'], ['files/storage', 'storage', [], true], ['files/folders', 'file-folder'], ['files/permissions', 'file-permission'], ['files/metadata', 'file-metadata'],
  ['search/indexes', 'search-index'], ['search/queries', 'search-query', [], true], ['search/filters', 'search-filter', [], true], ['search/ranking', 'search-ranking', ['rules'], true],
  ['audit/events', 'audit-event'], ['audit/logs', 'audit-log'], ['audit/access', 'access-audit'], ['audit/compliance', 'compliance-event'],
  ['settings/system', 'system-setting'], ['settings/organisation', 'organisation-setting'], ['settings/user', 'user-setting'], ['settings/platform', 'platform-setting']
];

const groupModules = new Map();
for (const [directory, name, extras = [], noEntity = false] of modules) {
  const [group] = directory.split('/');
  if (!groupModules.has(group)) groupModules.set(group, []);
  groupModules.get(group).push(directory.split('/')[1]);
  const typeName = pascal(name);
  const base = join(root, directory);
  const files = ['types', 'schema', 'repository', 'service'];
  if (!noEntity) files.unshift('entity');
  files.push(...extras, 'index');

  write(join(base, `${name}.types.ts`), `import type { Brand, EntityStatus, Metadata, Timestamped } from '../../shared/primitives';

/** Type contracts only; runtime validation belongs in ${name}.schema.ts. */
export type ${typeName}Id = Brand<string, '${typeName}Id'>;
export type ${typeName}Status = EntityStatus;
export type ${typeName} = Readonly<{ id: ${typeName}Id; status: ${typeName}Status; metadata: Metadata } & Timestamped>;
export type Create${typeName}Input = Readonly<{ id?: ${typeName}Id; metadata?: Metadata }>;
export type Update${typeName}Input = Readonly<{ metadata?: Metadata }>;
`);

  write(join(base, `${name}.schema.ts`), `import { z } from 'zod';

/** Runtime input validation only; this module has no persistence access. */
export const ${name.replaceAll('-', '_')}IdSchema = z.string().uuid();
export const create${typeName}Schema = z.object({ id: ${name.replaceAll('-', '_')}IdSchema.optional(), metadata: z.record(z.unknown()).default({}) }).strict();
export const update${typeName}Schema = z.object({ metadata: z.record(z.unknown()).optional() }).strict();
`);

  write(join(base, `${name}.repository.ts`), `import type { Repository } from '../../shared/repository';
import type { ${typeName}, ${typeName}Id } from './${name}.types';

/** Persistence port only. Database queries and adapter details live outside core. */
export interface ${typeName}Repository extends Repository<${typeName}Id, ${typeName}> {}
`);

  if (!noEntity) write(join(base, `${name}.entity.ts`), `import { invariant } from '../../shared/errors';
import { canTransitionStatus } from '../../shared/rules';
import { newId } from '../../shared/primitives';
import type { Create${typeName}Input, ${typeName}, ${typeName}Status } from './${name}.types';

/** Pure ${name} representation and invariants; no database or provider access. */
export const create${typeName} = (input: Create${typeName}Input, now = new Date()): ${typeName} => ({ id: input.id ?? newId<'${typeName}Id'>(), status: 'active', metadata: input.metadata ?? {}, createdAt: now, updatedAt: now });
export const transition${typeName}Status = (record: ${typeName}, status: ${typeName}Status, now = new Date()): ${typeName} => { invariant(canTransitionStatus(record.status, status), '${name}.invalid_status_transition', 'The requested lifecycle transition is not allowed.', { from: record.status, to: status }); return { ...record, status, updatedAt: now }; };
`);

  const entityImport = noEntity ? '' : `import { create${typeName}, transition${typeName}Status } from './${name}.entity';\n`;
  const createMethod = noEntity
    ? `async save(record: ${typeName}): Promise<${typeName}> { return this.repository.replace(record); }`
    : `async create(input: Create${typeName}Input): Promise<${typeName}> { return this.repository.insert(create${typeName}(input, this.now())); }\n  async changeStatus(id: ${typeName}Id, status: ${typeName}Status): Promise<${typeName}> { const record = await this.repository.findById(id); if (!record) throw new CoreError('${name}.not_found', 'The requested record does not exist.', { id }); return this.repository.replace(transition${typeName}Status(record, status, this.now())); }`;
  write(join(base, `${name}.service.ts`), `import { CoreError } from '../../shared/errors';
${entityImport}import type { ${typeName}Repository } from './${name}.repository';
import type { Create${typeName}Input, ${typeName}, ${typeName}Id, ${typeName}Status } from './${name}.types';

/** Use-case orchestration only. UI, HTTP and provider SDK concerns are forbidden here. */
export class ${typeName}Service {
  constructor(private readonly repository: ${typeName}Repository, private readonly now: () => Date = () => new Date()) {}
  async get(id: ${typeName}Id): Promise<${typeName} | null> { return this.repository.findById(id); }
  ${createMethod}
}
`);

  if (extras.includes('providers')) write(join(base, `${name}.providers.ts`), `import type { ${typeName}Id } from './${name}.types';
/** External authentication adapter port. Provider SDKs and credentials stay in infrastructure. */
export interface AuthenticationProvider { authenticate(input: Readonly<Record<string, unknown>>): Promise<Readonly<{ accountId: ${typeName}Id; providerSubject: string; requiresMfa: boolean }>>; revoke?(providerSubject: string): Promise<void>; }
`);
  if (extras.includes('errors')) write(join(base, `${name}.errors.ts`), `import { CoreError } from '../../shared/errors';
export type AuthenticationErrorCode = 'invalid_credentials' | 'provider_failure' | 'account_locked' | 'mfa_required' | 'verification_required' | 'authentication_expired';
export class AuthenticationError extends CoreError { constructor(code: AuthenticationErrorCode, message: string, context: Readonly<Record<string, unknown>> = {}) { super(code, message, context); } }
`);
  if (extras.includes('tokens')) write(join(base, `${name}.tokens.ts`), `/** Token port. Infrastructure supplies cryptography; token values are never persisted in plaintext. */
export interface VerificationTokenCodec { issue(input: Readonly<{ purpose: string; subjectId: string; expiresAt: Date }>): Promise<Readonly<{ token: string; tokenHash: string }>>; verify(token: string, hash: string, expiresAt: Date): Promise<boolean>; }
`);
  if (extras.includes('rules')) write(join(base, `${name}.rules.ts`), `/** Pure ranking rules. Search ranking is deterministic and never authorizes access. */
export const compareSearchRank = (left: Readonly<{ score: number; id: string }>, right: Readonly<{ score: number; id: string }>) => right.score - left.score || left.id.localeCompare(right.id);
`);

  const exportFiles = files.filter((file) => file !== 'index').map((file) => `export * from './${name}.${file}';`).join('\n');
  write(join(base, 'index.ts'), `// Public exports only. Do not add implementation logic to barrel files.\n${exportFiles}\n`);
}

for (const [group, children] of groupModules) {
  const lines = [...new Set(children)].map((child) => `export * from './${child}';`).join('\n');
  write(join(root, group, 'index.ts'), `// Public exports only.\n${lines}\n`);
}
write(join(root, 'index.ts'), `export * from './shared';
export * from './identity';
export * from './organisations';
export * from './users';
export * from './profiles';
export * from './roles';
export * from './permissions';
export * from './memberships';
export * from './notifications';
export * from './messaging';
export * from './files';
export * from './search';
export * from './audit';
export * from './settings';
`);
