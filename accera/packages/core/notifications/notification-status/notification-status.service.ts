import { CoreError } from '../../shared/errors';
import { createNotificationStatus, transitionNotificationStatusStatus } from './notification-status.entity';
import type { NotificationStatusRepository } from './notification-status.repository';
import type { CreateNotificationStatusInput, NotificationStatus, NotificationStatusId, NotificationStatusStatus } from './notification-status.types';

/** Use-case orchestration only. UI, HTTP and provider SDK concerns are forbidden here. */
export class NotificationStatusService {
  constructor(private readonly repository: NotificationStatusRepository, private readonly now: () => Date = () => new Date()) {}
  async get(id: NotificationStatusId): Promise<NotificationStatus | null> { return this.repository.findById(id); }
  async create(input: CreateNotificationStatusInput): Promise<NotificationStatus> { return this.repository.insert(createNotificationStatus(input, this.now())); }
  async changeStatus(id: NotificationStatusId, status: NotificationStatusStatus): Promise<NotificationStatus> { const record = await this.repository.findById(id); if (!record) throw new CoreError('notification-status.not_found', 'The requested record does not exist.', { id }); return this.repository.replace(transitionNotificationStatusStatus(record, status, this.now())); }
}
