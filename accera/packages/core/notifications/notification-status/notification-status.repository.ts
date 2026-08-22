import type { Repository } from '../../shared/repository';
import type { NotificationStatus, NotificationStatusId } from './notification-status.types';

/** Persistence port only. Database queries and adapter details live outside core. */
export interface NotificationStatusRepository extends Repository<NotificationStatusId, NotificationStatus> {}
