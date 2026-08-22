import { CoreError } from '../../shared/errors';
import { createSystemSetting, transitionSystemSettingStatus } from './system-setting.entity';
import type { SystemSettingRepository } from './system-setting.repository';
import type { CreateSystemSettingInput, SystemSetting, SystemSettingId, SystemSettingStatus } from './system-setting.types';

/** Use-case orchestration only. UI, HTTP and provider SDK concerns are forbidden here. */
export class SystemSettingService {
  constructor(private readonly repository: SystemSettingRepository, private readonly now: () => Date = () => new Date()) {}
  async get(id: SystemSettingId): Promise<SystemSetting | null> { return this.repository.findById(id); }
  async create(input: CreateSystemSettingInput): Promise<SystemSetting> { return this.repository.insert(createSystemSetting(input, this.now())); }
  async changeStatus(id: SystemSettingId, status: SystemSettingStatus): Promise<SystemSetting> { const record = await this.repository.findById(id); if (!record) throw new CoreError('system-setting.not_found', 'The requested record does not exist.', { id }); return this.repository.replace(transitionSystemSettingStatus(record, status, this.now())); }
}
