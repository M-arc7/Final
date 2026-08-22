import type { Repository } from '../../shared/repository';
import type { ProfessionalProfile, ProfessionalProfileId } from './professional-profile.types';

/** Persistence port only. Database queries and adapter details live outside core. */
export interface ProfessionalProfileRepository extends Repository<ProfessionalProfileId, ProfessionalProfile> {}
