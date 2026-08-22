import type { Brand, EntityStatus, Metadata, Timestamped } from '../../shared/primitives';

/** Type contracts only; runtime validation belongs in organisation-role.schema.ts. */
export type OrganisationRoleId = Brand<string, 'OrganisationRoleId'>;
export type OrganisationRoleStatus = EntityStatus;
export type OrganisationRole = Readonly<{ id: OrganisationRoleId; status: OrganisationRoleStatus; metadata: Metadata } & Timestamped>;
export type CreateOrganisationRoleInput = Readonly<{ id?: OrganisationRoleId; metadata?: Metadata }>;
export type UpdateOrganisationRoleInput = Readonly<{ metadata?: Metadata }>;
