import { invariant } from '../../shared/errors';
import { canTransitionStatus } from '../../shared/rules';
import { newId } from '../../shared/primitives';
import type { CreateUserVerificationInput, UserVerification, UserVerificationStatus } from './user-verification.types';

/** Pure user-verification representation and invariants; no database or provider access. */
export const createUserVerification = (input: CreateUserVerificationInput, now = new Date()): UserVerification => ({ id: input.id ?? newId<'UserVerificationId'>(), status: 'active', metadata: input.metadata ?? {}, createdAt: now, updatedAt: now });
export const transitionUserVerificationStatus = (record: UserVerification, status: UserVerificationStatus, now = new Date()): UserVerification => { invariant(canTransitionStatus(record.status, status), 'user-verification.invalid_status_transition', 'The requested lifecycle transition is not allowed.', { from: record.status, to: status }); return { ...record, status, updatedAt: now }; };
