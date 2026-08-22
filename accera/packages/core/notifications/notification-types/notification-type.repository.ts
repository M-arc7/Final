import type { Repository } from '../../shared/repository';
import type { NotificationType, NotificationTypeId } from './notification-type.types';

/** Persistence port only. Database queries and adapter details live outside core. */
export interface NotificationTypeRepository extends Repository<NotificationTypeId, NotificationType> {}
