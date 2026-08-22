import type { Repository } from '../../shared/repository';
import type { OrganisationRole, OrganisationRoleId } from './organisation-role.types';

/** Persistence port only. Database queries and adapter details live outside core. */
export interface OrganisationRoleRepository extends Repository<OrganisationRoleId, OrganisationRole> {}
