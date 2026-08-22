import { CoreError } from '../../shared/errors';
import { createNotificationType, transitionNotificationTypeStatus } from './notification-type.entity';
import type { NotificationTypeRepository } from './notification-type.repository';
import type { CreateNotificationTypeInput, NotificationType, NotificationTypeId, NotificationTypeStatus } from './notification-type.types';

/** Use-case orchestration only. UI, HTTP and provider SDK concerns are forbidden here. */
export class NotificationTypeService {
  constructor(private readonly repository: NotificationTypeRepository, private readonly now: () => Date = () => new Date()) {}
  async get(id: NotificationTypeId): Promise<NotificationType | null> { return this.repository.findById(id); }
  async create(input: CreateNotificationTypeInput): Promise<NotificationType> { return this.repository.insert(createNotificationType(input, this.now())); }
  async changeStatus(id: NotificationTypeId, status: NotificationTypeStatus): Promise<NotificationType> { const record = await this.repository.findById(id); if (!record) throw new CoreError('notification-type.not_found', 'The requested record does not exist.', { id }); return this.repository.replace(transitionNotificationTypeStatus(record, status, this.now())); }
}
