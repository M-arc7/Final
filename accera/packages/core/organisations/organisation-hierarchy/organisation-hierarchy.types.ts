import type { Brand, EntityStatus, Metadata, Timestamped } from '../../shared/primitives';

/** Type contracts only; runtime validation belongs in organisation-hierarchy.schema.ts. */
export type OrganisationHierarchyId = Brand<string, 'OrganisationHierarchyId'>;
export type OrganisationHierarchyStatus = EntityStatus;
export type OrganisationHierarchy = Readonly<{ id: OrganisationHierarchyId; status: OrganisationHierarchyStatus; metadata: Metadata } & Timestamped>;
export type CreateOrganisationHierarchyInput = Readonly<{ id?: OrganisationHierarchyId; metadata?: Metadata }>;
export type UpdateOrganisationHierarchyInput = Readonly<{ metadata?: Metadata }>;
