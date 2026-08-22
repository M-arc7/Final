import { invariant } from '../../shared/errors';
import { canTransitionStatus } from '../../shared/rules';
import { newId } from '../../shared/primitives';
import type { CreateMembershipRenewalInput, MembershipRenewal, MembershipRenewalStatus } from './membership-renewal.types';

/** Pure membership-renewal representation and invariants; no database or provider access. */
export const createMembershipRenewal = (input: CreateMembershipRenewalInput, now = new Date()): MembershipRenewal => ({ id: input.id ?? newId<'MembershipRenewalId'>(), status: 'active', metadata: input.metadata ?? {}, createdAt: now, updatedAt: now });
export const transitionMembershipRenewalStatus = (record: MembershipRenewal, status: MembershipRenewalStatus, now = new Date()): MembershipRenewal => { invariant(canTransitionStatus(record.status, status), 'membership-renewal.invalid_status_transition', 'The requested lifecycle transition is not allowed.', { from: record.status, to: status }); return { ...record, status, updatedAt: now }; };
