import { CoreError } from '../../shared/errors';
import { createOrganisationSetting, transitionOrganisationSettingStatus } from './organisation-setting.entity';
import type { OrganisationSettingRepository } from './organisation-setting.repository';
import type { CreateOrganisationSettingInput, OrganisationSetting, OrganisationSettingId, OrganisationSettingStatus } from './organisation-setting.types';

/** Use-case orchestration only. UI, HTTP and provider SDK concerns are forbidden here. */
export class OrganisationSettingService {
  constructor(private readonly repository: OrganisationSettingRepository, private readonly now: () => Date = () => new Date()) {}
  async get(id: OrganisationSettingId): Promise<OrganisationSetting | null> { return this.repository.findById(id); }
  async create(input: CreateOrganisationSettingInput): Promise<OrganisationSetting> { return this.repository.insert(createOrganisationSetting(input, this.now())); }
  async changeStatus(id: OrganisationSettingId, status: OrganisationSettingStatus): Promise<OrganisationSetting> { const record = await this.repository.findById(id); if (!record) throw new CoreError('organisation-setting.not_found', 'The requested record does not exist.', { id }); return this.repository.replace(transitionOrganisationSettingStatus(record, status, this.now())); }
}
