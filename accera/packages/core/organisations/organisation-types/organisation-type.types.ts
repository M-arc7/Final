import type { Brand, EntityStatus, Metadata, Timestamped } from '../../shared/primitives';

/** Type contracts only; runtime validation belongs in organisation-type.schema.ts. */
export type OrganisationTypeId = Brand<string, 'OrganisationTypeId'>;
export type OrganisationTypeStatus = EntityStatus;
export type OrganisationType = Readonly<{ id: OrganisationTypeId; status: OrganisationTypeStatus; metadata: Metadata } & Timestamped>;
export type CreateOrganisationTypeInput = Readonly<{ id?: OrganisationTypeId; metadata?: Metadata }>;
export type UpdateOrganisationTypeInput = Readonly<{ metadata?: Metadata }>;
