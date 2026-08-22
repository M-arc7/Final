import type { Repository } from '../../shared/repository';
import type { PersonalProfile, PersonalProfileId } from './personal-profile.types';

/** Persistence port only. Database queries and adapter details live outside core. */
export interface PersonalProfileRepository extends Repository<PersonalProfileId, PersonalProfile> {}
