import type { Brand, EntityStatus, Metadata, Timestamped } from '../../shared/primitives';

/** Type contracts only; runtime validation belongs in membership-plan.schema.ts. */
export type MembershipPlanId = Brand<string, 'MembershipPlanId'>;
export type MembershipPlanStatus = EntityStatus;
export type MembershipPlan = Readonly<{ id: MembershipPlanId; status: MembershipPlanStatus; metadata: Metadata } & Timestamped>;
export type CreateMembershipPlanInput = Readonly<{ id?: MembershipPlanId; metadata?: Metadata }>;
export type UpdateMembershipPlanInput = Readonly<{ metadata?: Metadata }>;
