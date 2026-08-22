import { CoreError } from '../../shared/errors';
import { createRoleDefinition, transitionRoleDefinitionStatus } from './role-definition.entity';
import type { RoleDefinitionRepository } from './role-definition.repository';
import type { CreateRoleDefinitionInput, RoleDefinition, RoleDefinitionId, RoleDefinitionStatus } from './role-definition.types';

/** Use-case orchestration only. UI, HTTP and provider SDK concerns are forbidden here. */
export class RoleDefinitionService {
  constructor(private readonly repository: RoleDefinitionRepository, private readonly now: () => Date = () => new Date()) {}
  async get(id: RoleDefinitionId): Promise<RoleDefinition | null> { return this.repository.findById(id); }
  async create(input: CreateRoleDefinitionInput): Promise<RoleDefinition> { return this.repository.insert(createRoleDefinition(input, this.now())); }
  async changeStatus(id: RoleDefinitionId, status: RoleDefinitionStatus): Promise<RoleDefinition> { const record = await this.repository.findById(id); if (!record) throw new CoreError('role-definition.not_found', 'The requested record does not exist.', { id }); return this.repository.replace(transitionRoleDefinitionStatus(record, status, this.now())); }
}
