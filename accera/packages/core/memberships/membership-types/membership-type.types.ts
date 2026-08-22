import type { Brand, EntityStatus, Metadata, Timestamped } from '../../shared/primitives';

/** Type contracts only; runtime validation belongs in membership-type.schema.ts. */
export type MembershipTypeId = Brand<string, 'MembershipTypeId'>;
export type MembershipTypeStatus = EntityStatus;
export type MembershipType = Readonly<{ id: MembershipTypeId; status: MembershipTypeStatus; metadata: Metadata } & Timestamped>;
export type CreateMembershipTypeInput = Readonly<{ id?: MembershipTypeId; metadata?: Metadata }>;
export type UpdateMembershipTypeInput = Readonly<{ metadata?: Metadata }>;
