import type { Brand, EntityStatus, Metadata, Timestamped } from '../../shared/primitives';

/** Type contracts only; runtime validation belongs in organisation.schema.ts. */
export type OrganisationId = Brand<string, 'OrganisationId'>;
export type OrganisationStatus = EntityStatus;
export type Organisation = Readonly<{ id: OrganisationId; status: OrganisationStatus; metadata: Metadata } & Timestamped>;
export type CreateOrganisationInput = Readonly<{ id?: OrganisationId; metadata?: Metadata }>;
export type UpdateOrganisationInput = Readonly<{ metadata?: Metadata }>;
