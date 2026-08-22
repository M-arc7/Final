import type { Brand, EntityStatus, Metadata, Timestamped } from '../../shared/primitives';

/** Type contracts only; runtime validation belongs in membership.schema.ts. */
export type MembershipId = Brand<string, 'MembershipId'>;
export type MembershipStatus = EntityStatus;
export type Membership = Readonly<{ id: MembershipId; status: MembershipStatus; metadata: Metadata } & Timestamped>;
export type CreateMembershipInput = Readonly<{ id?: MembershipId; metadata?: Metadata }>;
export type UpdateMembershipInput = Readonly<{ metadata?: Metadata }>;
