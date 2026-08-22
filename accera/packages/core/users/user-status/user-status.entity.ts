import { invariant } from '../../shared/errors';
import { canTransitionStatus } from '../../shared/rules';
import { newId } from '../../shared/primitives';
import type { CreateUserStatusInput, UserStatus, UserStatusStatus } from './user-status.types';

/** Pure user-status representation and invariants; no database or provider access. */
export const createUserStatus = (input: CreateUserStatusInput, now = new Date()): UserStatus => ({ id: input.id ?? newId<'UserStatusId'>(), status: 'active', metadata: input.metadata ?? {}, createdAt: now, updatedAt: now });
export const transitionUserStatusStatus = (record: UserStatus, status: UserStatusStatus, now = new Date()): UserStatus => { invariant(canTransitionStatus(record.status, status), 'user-status.invalid_status_transition', 'The requested lifecycle transition is not allowed.', { from: record.status, to: status }); return { ...record, status, updatedAt: now }; };
