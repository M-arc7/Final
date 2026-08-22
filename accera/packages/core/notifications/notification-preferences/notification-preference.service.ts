import { CoreError } from '../../shared/errors';
import { createNotificationPreference, transitionNotificationPreferenceStatus } from './notification-preference.entity';
import type { NotificationPreferenceRepository } from './notification-preference.repository';
import type { CreateNotificationPreferenceInput, NotificationPreference, NotificationPreferenceId, NotificationPreferenceStatus } from './notification-preference.types';

/** Use-case orchestration only. UI, HTTP and provider SDK concerns are forbidden here. */
export class NotificationPreferenceService {
  constructor(private readonly repository: NotificationPreferenceRepository, private readonly now: () => Date = () => new Date()) {}
  async get(id: NotificationPreferenceId): Promise<NotificationPreference | null> { return this.repository.findById(id); }
  async create(input: CreateNotificationPreferenceInput): Promise<NotificationPreference> { return this.repository.insert(createNotificationPreference(input, this.now())); }
  async changeStatus(id: NotificationPreferenceId, status: NotificationPreferenceStatus): Promise<NotificationPreference> { const record = await this.repository.findById(id); if (!record) throw new CoreError('notification-preference.not_found', 'The requested record does not exist.', { id }); return this.repository.replace(transitionNotificationPreferenceStatus(record, status, this.now())); }
}
