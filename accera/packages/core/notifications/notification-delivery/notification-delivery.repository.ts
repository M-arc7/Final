import type { Repository } from '../../shared/repository';
import type { NotificationDelivery, NotificationDeliveryId } from './notification-delivery.types';

/** Persistence port only. Database queries and adapter details live outside core. */
export interface NotificationDeliveryRepository extends Repository<NotificationDeliveryId, NotificationDelivery> {}
