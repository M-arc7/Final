import { invariant } from '../../shared/errors';
import { canTransitionStatus } from '../../shared/rules';
import { newId } from '../../shared/primitives';
import type { CreateMembershipTypeInput, MembershipType, MembershipTypeStatus } from './membership-type.types';

/** Pure membership-type representation and invariants; no database or provider access. */
export const createMembershipType = (input: CreateMembershipTypeInput, now = new Date()): MembershipType => ({ id: input.id ?? newId<'MembershipTypeId'>(), status: 'active', metadata: input.metadata ?? {}, createdAt: now, updatedAt: now });
export const transitionMembershipTypeStatus = (record: MembershipType, status: MembershipTypeStatus, now = new Date()): MembershipType => { invariant(canTransitionStatus(record.status, status), 'membership-type.invalid_status_transition', 'The requested lifecycle transition is not allowed.', { from: record.status, to: status }); return { ...record, status, updatedAt: now }; };
