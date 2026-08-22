import type { Brand, EntityStatus, Metadata, Timestamped } from '../../shared/primitives';

/** Type contracts only; runtime validation belongs in organisation-member.schema.ts. */
export type OrganisationMemberId = Brand<string, 'OrganisationMemberId'>;
export type OrganisationMemberStatus = EntityStatus;
export type OrganisationMember = Readonly<{ id: OrganisationMemberId; status: OrganisationMemberStatus; metadata: Metadata } & Timestamped>;
export type CreateOrganisationMemberInput = Readonly<{ id?: OrganisationMemberId; metadata?: Metadata }>;
export type UpdateOrganisationMemberInput = Readonly<{ metadata?: Metadata }>;
