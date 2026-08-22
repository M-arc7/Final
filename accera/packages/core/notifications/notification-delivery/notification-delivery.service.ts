import { CoreError } from '../../shared/errors';
import { createNotificationDelivery, transitionNotificationDeliveryStatus } from './notification-delivery.entity';
import type { NotificationDeliveryRepository } from './notification-delivery.repository';
import type { CreateNotificationDeliveryInput, NotificationDelivery, NotificationDeliveryId, NotificationDeliveryStatus } from './notification-delivery.types';

/** Use-case orchestration only. UI, HTTP and provider SDK concerns are forbidden here. */
export class NotificationDeliveryService {
  constructor(private readonly repository: NotificationDeliveryRepository, private readonly now: () => Date = () => new Date()) {}
  async get(id: NotificationDeliveryId): Promise<NotificationDelivery | null> { return this.repository.findById(id); }
  async create(input: CreateNotificationDeliveryInput): Promise<NotificationDelivery> { return this.repository.insert(createNotificationDelivery(input, this.now())); }
  async changeStatus(id: NotificationDeliveryId, status: NotificationDeliveryStatus): Promise<NotificationDelivery> { const record = await this.repository.findById(id); if (!record) throw new CoreError('notification-delivery.not_found', 'The requested record does not exist.', { id }); return this.repository.replace(transitionNotificationDeliveryStatus(record, status, this.now())); }
}
