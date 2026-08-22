import { CoreError } from '../../shared/errors';
import { createPermission, transitionPermissionStatus } from './permission.entity';
import type { PermissionRepository } from './permission.repository';
import type { CreatePermissionInput, Permission, PermissionId, PermissionStatus } from './permission.types';

/** Use-case orchestration only. UI, HTTP and provider SDK concerns are forbidden here. */
export class PermissionService {
  constructor(private readonly repository: PermissionRepository, private readonly now: () => Date = () => new Date()) {}
  async get(id: PermissionId): Promise<Permission | null> { return this.repository.findById(id); }
  async create(input: CreatePermissionInput): Promise<Permission> { return this.repository.insert(createPermission(input, this.now())); }
  async changeStatus(id: PermissionId, status: PermissionStatus): Promise<Permission> { const record = await this.repository.findById(id); if (!record) throw new CoreError('permission.not_found', 'The requested record does not exist.', { id }); return this.repository.replace(transitionPermissionStatus(record, status, this.now())); }
}
