import { invariant } from '../../shared/errors';
import { canTransitionStatus } from '../../shared/rules';
import { newId } from '../../shared/primitives';
import type { CreateAccessPolicyInput, AccessPolicy, AccessPolicyStatus } from './access-policy.types';

/** Pure access-policy representation and invariants; no database or provider access. */
export const createAccessPolicy = (input: CreateAccessPolicyInput, now = new Date()): AccessPolicy => ({ id: input.id ?? newId<'AccessPolicyId'>(), status: 'active', metadata: input.metadata ?? {}, createdAt: now, updatedAt: now });
export const transitionAccessPolicyStatus = (record: AccessPolicy, status: AccessPolicyStatus, now = new Date()): AccessPolicy => { invariant(canTransitionStatus(record.status, status), 'access-policy.invalid_status_transition', 'The requested lifecycle transition is not allowed.', { from: record.status, to: status }); return { ...record, status, updatedAt: now }; };
