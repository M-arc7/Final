import type { Repository } from '../../shared/repository';
import type { UserPreference, UserPreferenceId } from './user-preference.types';

/** Persistence port only. Database queries and adapter details live outside core. */
export interface UserPreferenceRepository extends Repository<UserPreferenceId, UserPreference> {}
