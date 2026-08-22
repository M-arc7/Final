import { invariant } from '../../shared/errors';
import { canTransitionStatus } from '../../shared/rules';
import { newId } from '../../shared/primitives';
import type { CreateMembershipPlanInput, MembershipPlan, MembershipPlanStatus } from './membership-plan.types';

/** Pure membership-plan representation and invariants; no database or provider access. */
export const createMembershipPlan = (input: CreateMembershipPlanInput, now = new Date()): MembershipPlan => ({ id: input.id ?? newId<'MembershipPlanId'>(), status: 'active', metadata: input.metadata ?? {}, createdAt: now, updatedAt: now });
export const transitionMembershipPlanStatus = (record: MembershipPlan, status: MembershipPlanStatus, now = new Date()): MembershipPlan => { invariant(canTransitionStatus(record.status, status), 'membership-plan.invalid_status_transition', 'The requested lifecycle transition is not allowed.', { from: record.status, to: status }); return { ...record, status, updatedAt: now }; };
