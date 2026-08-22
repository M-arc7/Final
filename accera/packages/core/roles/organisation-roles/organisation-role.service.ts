import { CoreError } from '../../shared/errors';
import { createOrganisationRole, transitionOrganisationRoleStatus } from './organisation-role.entity';
import type { OrganisationRoleRepository } from './organisation-role.repository';
import type { CreateOrganisationRoleInput, OrganisationRole, OrganisationRoleId, OrganisationRoleStatus } from './organisation-role.types';

/** Use-case orchestration only. UI, HTTP and provider SDK concerns are forbidden here. */
export class OrganisationRoleService {
  constructor(private readonly repository: OrganisationRoleRepository, private readonly now: () => Date = () => new Date()) {}
  async get(id: OrganisationRoleId): Promise<OrganisationRole | null> { return this.repository.findById(id); }
  async create(input: CreateOrganisationRoleInput): Promise<OrganisationRole> { return this.repository.insert(createOrganisationRole(input, this.now())); }
  async changeStatus(id: OrganisationRoleId, status: OrganisationRoleStatus): Promise<OrganisationRole> { const record = await this.repository.findById(id); if (!record) throw new CoreError('organisation-role.not_found', 'The requested record does not exist.', { id }); return this.repository.replace(transitionOrganisationRoleStatus(record, status, this.now())); }
}
