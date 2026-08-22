import { invariant } from '../../shared/errors';
import { canTransitionStatus } from '../../shared/rules';
import { newId } from '../../shared/primitives';
import type { CreateVerificationInput, Verification, VerificationStatus } from './verification.types';

/** Pure verification representation and invariants; no database or provider access. */
export const createVerification = (input: CreateVerificationInput, now = new Date()): Verification => ({ id: input.id ?? newId<'VerificationId'>(), status: 'active', metadata: input.metadata ?? {}, createdAt: now, updatedAt: now });
export const transitionVerificationStatus = (record: Verification, status: VerificationStatus, now = new Date()): Verification => { invariant(canTransitionStatus(record.status, status), 'verification.invalid_status_transition', 'The requested lifecycle transition is not allowed.', { from: record.status, to: status }); return { ...record, status, updatedAt: now }; };
