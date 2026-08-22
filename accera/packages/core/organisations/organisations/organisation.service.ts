import { CoreError } from '../../shared/errors';
import { createOrganisation, transitionOrganisationStatus } from './organisation.entity';
import type { OrganisationRepository } from './organisation.repository';
import type { CreateOrganisationInput, Organisation, OrganisationId, OrganisationStatus } from './organisation.types';

/** Use-case orchestration only. UI, HTTP and provider SDK concerns are forbidden here. */
export class OrganisationService {
  constructor(private readonly repository: OrganisationRepository, private readonly now: () => Date = () => new Date()) {}
  async get(id: OrganisationId): Promise<Organisation | null> { return this.repository.findById(id); }
  async create(input: CreateOrganisationInput): Promise<Organisation> { return this.repository.insert(createOrganisation(input, this.now())); }
  async changeStatus(id: OrganisationId, status: OrganisationStatus): Promise<Organisation> { const record = await this.repository.findById(id); if (!record) throw new CoreError('organisation.not_found', 'The requested record does not exist.', { id }); return this.repository.replace(transitionOrganisationStatus(record, status, this.now())); }
}
