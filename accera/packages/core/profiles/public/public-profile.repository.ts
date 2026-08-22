import type { Repository } from '../../shared/repository';
import type { PublicProfile, PublicProfileId } from './public-profile.types';

/** Persistence port only. Database queries and adapter details live outside core. */
export interface PublicProfileRepository extends Repository<PublicProfileId, PublicProfile> {}
