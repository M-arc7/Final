import { invariant } from '../../shared/errors';
import { canTransitionStatus } from '../../shared/rules';
import { newId } from '../../shared/primitives';
import type { CreateAuthenticationInput, Authentication, AuthenticationStatus } from './authentication.types';

/** Pure authentication representation and invariants; no database or provider access. */
export const createAuthentication = (input: CreateAuthenticationInput, now = new Date()): Authentication => ({ id: input.id ?? newId<'AuthenticationId'>(), status: 'active', metadata: input.metadata ?? {}, createdAt: now, updatedAt: now });
export const transitionAuthenticationStatus = (record: Authentication, status: AuthenticationStatus, now = new Date()): Authentication => { invariant(canTransitionStatus(record.status, status), 'authentication.invalid_status_transition', 'The requested lifecycle transition is not allowed.', { from: record.status, to: status }); return { ...record, status, updatedAt: now }; };
