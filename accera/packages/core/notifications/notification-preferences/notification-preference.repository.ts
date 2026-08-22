import type { Repository } from '../../shared/repository';
import type { NotificationPreference, NotificationPreferenceId } from './notification-preference.types';

/** Persistence port only. Database queries and adapter details live outside core. */
export interface NotificationPreferenceRepository extends Repository<NotificationPreferenceId, NotificationPreference> {}
