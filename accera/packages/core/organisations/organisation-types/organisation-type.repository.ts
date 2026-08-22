import type { Repository } from '../../shared/repository';
import type { OrganisationType, OrganisationTypeId } from './organisation-type.types';

/** Persistence port only. Database queries and adapter details live outside core. */
export interface OrganisationTypeRepository extends Repository<OrganisationTypeId, OrganisationType> {}
