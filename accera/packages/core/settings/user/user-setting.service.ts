import { CoreError } from '../../shared/errors';
import { createUserSetting, transitionUserSettingStatus } from './user-setting.entity';
import type { UserSettingRepository } from './user-setting.repository';
import type { CreateUserSettingInput, UserSetting, UserSettingId, UserSettingStatus } from './user-setting.types';

/** Use-case orchestration only. UI, HTTP and provider SDK concerns are forbidden here. */
export class UserSettingService {
  constructor(private readonly repository: UserSettingRepository, private readonly now: () => Date = () => new Date()) {}
  async get(id: UserSettingId): Promise<UserSetting | null> { return this.repository.findById(id); }
  async create(input: CreateUserSettingInput): Promise<UserSetting> { return this.repository.insert(createUserSetting(input, this.now())); }
  async changeStatus(id: UserSettingId, status: UserSettingStatus): Promise<UserSetting> { const record = await this.repository.findById(id); if (!record) throw new CoreError('user-setting.not_found', 'The requested record does not exist.', { id }); return this.repository.replace(transitionUserSettingStatus(record, status, this.now())); }
}
