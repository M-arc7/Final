import type { Repository } from '../../shared/repository';
import type { OrganisationHierarchy, OrganisationHierarchyId } from './organisation-hierarchy.types';

/** Persistence port only. Database queries and adapter details live outside core. */
export interface OrganisationHierarchyRepository extends Repository<OrganisationHierarchyId, OrganisationHierarchy> {}
