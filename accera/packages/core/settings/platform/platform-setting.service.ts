import { CoreError } from '../../shared/errors';
import { createPlatformSetting, transitionPlatformSettingStatus } from './platform-setting.entity';
import type { PlatformSettingRepository } from './platform-setting.repository';
import type { CreatePlatformSettingInput, PlatformSetting, PlatformSettingId, PlatformSettingStatus } from './platform-setting.types';

/** Use-case orchestration only. UI, HTTP and provider SDK concerns are forbidden here. */
export class PlatformSettingService {
  constructor(private readonly repository: PlatformSettingRepository, private readonly now: () => Date = () => new Date()) {}
  async get(id: PlatformSettingId): Promise<PlatformSetting | null> { return this.repository.findById(id); }
  async create(input: CreatePlatformSettingInput): Promise<PlatformSetting> { return this.repository.insert(createPlatformSetting(input, this.now())); }
  async changeStatus(id: PlatformSettingId, status: PlatformSettingStatus): Promise<PlatformSetting> { const record = await this.repository.findById(id); if (!record) throw new CoreError('platform-setting.not_found', 'The requested record does not exist.', { id }); return this.repository.replace(transitionPlatformSettingStatus(record, status, this.now())); }
}
