import type { Brand, EntityStatus, Metadata, Timestamped } from '../../shared/primitives';

/** Type contracts only; runtime validation belongs in membership-renewal.schema.ts. */
export type MembershipRenewalId = Brand<string, 'MembershipRenewalId'>;
export type MembershipRenewalStatus = EntityStatus;
export type MembershipRenewal = Readonly<{ id: MembershipRenewalId; status: MembershipRenewalStatus; metadata: Metadata } & Timestamped>;
export type CreateMembershipRenewalInput = Readonly<{ id?: MembershipRenewalId; metadata?: Metadata }>;
export type UpdateMembershipRenewalInput = Readonly<{ metadata?: Metadata }>;
