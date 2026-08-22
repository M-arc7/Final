import { CoreError } from '../../shared/errors';
import { createOrganisationType, transitionOrganisationTypeStatus } from './organisation-type.entity';
import type { OrganisationTypeRepository } from './organisation-type.repository';
import type { CreateOrganisationTypeInput, OrganisationType, OrganisationTypeId, OrganisationTypeStatus } from './organisation-type.types';

/** Use-case orchestration only. UI, HTTP and provider SDK concerns are forbidden here. */
export class OrganisationTypeService {
  constructor(private readonly repository: OrganisationTypeRepository, private readonly now: () => Date = () => new Date()) {}
  async get(id: OrganisationTypeId): Promise<OrganisationType | null> { return this.repository.findById(id); }
  async create(input: CreateOrganisationTypeInput): Promise<OrganisationType> { return this.repository.insert(createOrganisationType(input, this.now())); }
  async changeStatus(id: OrganisationTypeId, status: OrganisationTypeStatus): Promise<OrganisationType> { const record = await this.repository.findById(id); if (!record) throw new CoreError('organisation-type.not_found', 'The requested record does not exist.', { id }); return this.repository.replace(transitionOrganisationTypeStatus(record, status, this.now())); }
}
