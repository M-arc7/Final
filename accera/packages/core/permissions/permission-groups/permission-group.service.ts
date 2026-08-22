import { CoreError } from '../../shared/errors';
import { createPermissionGroup, transitionPermissionGroupStatus } from './permission-group.entity';
import type { PermissionGroupRepository } from './permission-group.repository';
import type { CreatePermissionGroupInput, PermissionGroup, PermissionGroupId, PermissionGroupStatus } from './permission-group.types';

/** Use-case orchestration only. UI, HTTP and provider SDK concerns are forbidden here. */
export class PermissionGroupService {
  constructor(private readonly repository: PermissionGroupRepository, private readonly now: () => Date = () => new Date()) {}
  async get(id: PermissionGroupId): Promise<PermissionGroup | null> { return this.repository.findById(id); }
  async create(input: CreatePermissionGroupInput): Promise<PermissionGroup> { return this.repository.insert(createPermissionGroup(input, this.now())); }
  async changeStatus(id: PermissionGroupId, status: PermissionGroupStatus): Promise<PermissionGroup> { const record = await this.repository.findById(id); if (!record) throw new CoreError('permission-group.not_found', 'The requested record does not exist.', { id }); return this.repository.replace(transitionPermissionGroupStatus(record, status, this.now())); }
}
