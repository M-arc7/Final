import { invariant } from '../../shared/errors';
import { canTransitionStatus } from '../../shared/rules';
import { newId } from '../../shared/primitives';
import type { CreateUserInput, User, UserStatus } from './user.types';

/** Pure user representation and invariants; no database or provider access. */
export const createUser = (input: CreateUserInput, now = new Date()): User => ({ id: input.id ?? newId<'UserId'>(), status: 'active', metadata: input.metadata ?? {}, createdAt: now, updatedAt: now });
export const transitionUserStatus = (record: User, status: UserStatus, now = new Date()): User => { invariant(canTransitionStatus(record.status, status), 'user.invalid_status_transition', 'The requested lifecycle transition is not allowed.', { from: record.status, to: status }); return { ...record, status, updatedAt: now }; };
