import type { Repository } from '../../shared/repository';
import type { SocialProfile, SocialProfileId } from './social-profile.types';

/** Persistence port only. Database queries and adapter details live outside core. */
export interface SocialProfileRepository extends Repository<SocialProfileId, SocialProfile> {}
