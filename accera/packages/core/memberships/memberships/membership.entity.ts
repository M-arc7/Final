import { invariant } from '../../shared/errors';
import { canTransitionStatus } from '../../shared/rules';
import { newId } from '../../shared/primitives';
import type { CreateMembershipInput, Membership, MembershipStatus } from './membership.types';

/** Pure membership representation and invariants; no database or provider access. */
export const createMembership = (input: CreateMembershipInput, now = new Date()): Membership => ({ id: input.id ?? newId<'MembershipId'>(), status: 'active', metadata: input.metadata ?? {}, createdAt: now, updatedAt: now });
export const transitionMembershipStatus = (record: Membership, status: MembershipStatus, now = new Date()): Membership => { invariant(canTransitionStatus(record.status, status), 'membership.invalid_status_transition', 'The requested lifecycle transition is not allowed.', { from: record.status, to: status }); return { ...record, status, updatedAt: now }; };
