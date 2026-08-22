import { CoreError } from '../../shared/errors';
import { createSystemRole, transitionSystemRoleStatus } from './system-role.entity';
import type { SystemRoleRepository } from './system-role.repository';
import type { CreateSystemRoleInput, SystemRole, SystemRoleId, SystemRoleStatus } from './system-role.types';

/** Use-case orchestration only. UI, HTTP and provider SDK concerns are forbidden here. */
export class SystemRoleService {
  constructor(private readonly repository: SystemRoleRepository, private readonly now: () => Date = () => new Date()) {}
  async get(id: SystemRoleId): Promise<SystemRole | null> { return this.repository.findById(id); }
  async create(input: CreateSystemRoleInput): Promise<SystemRole> { return this.repository.insert(createSystemRole(input, this.now())); }
  async changeStatus(id: SystemRoleId, status: SystemRoleStatus): Promise<SystemRole> { const record = await this.repository.findById(id); if (!record) throw new CoreError('system-role.not_found', 'The requested record does not exist.', { id }); return this.repository.replace(transitionSystemRoleStatus(record, status, this.now())); }
}
