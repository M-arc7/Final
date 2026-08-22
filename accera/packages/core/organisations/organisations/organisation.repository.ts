import type { Repository } from '../../shared/repository';
import type { Organisation, OrganisationId } from './organisation.types';

/** Persistence port only. Database queries and adapter details live outside core. */
export interface OrganisationRepository extends Repository<OrganisationId, Organisation> {}
