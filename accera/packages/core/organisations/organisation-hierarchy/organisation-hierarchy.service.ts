import { CoreError } from '../../shared/errors';
import { createOrganisationHierarchy, transitionOrganisationHierarchyStatus } from './organisation-hierarchy.entity';
import type { OrganisationHierarchyRepository } from './organisation-hierarchy.repository';
import type { CreateOrganisationHierarchyInput, OrganisationHierarchy, OrganisationHierarchyId, OrganisationHierarchyStatus } from './organisation-hierarchy.types';

/** Use-case orchestration only. UI, HTTP and provider SDK concerns are forbidden here. */
export class OrganisationHierarchyService {
  constructor(private readonly repository: OrganisationHierarchyRepository, private readonly now: () => Date = () => new Date()) {}
  async get(id: OrganisationHierarchyId): Promise<OrganisationHierarchy | null> { return this.repository.findById(id); }
  async create(input: CreateOrganisationHierarchyInput): Promise<OrganisationHierarchy> { return this.repository.insert(createOrganisationHierarchy(input, this.now())); }
  async changeStatus(id: OrganisationHierarchyId, status: OrganisationHierarchyStatus): Promise<OrganisationHierarchy> { const record = await this.repository.findById(id); if (!record) throw new CoreError('organisation-hierarchy.not_found', 'The requested record does not exist.', { id }); return this.repository.replace(transitionOrganisationHierarchyStatus(record, status, this.now())); }
}
