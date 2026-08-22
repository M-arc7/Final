import { CoreError } from '../../shared/errors';
import type { PermissionCheckRepository } from './permission-check.repository';
import type { CreatePermissionCheckInput, PermissionCheck, PermissionCheckId, PermissionCheckStatus } from './permission-check.types';

/** Use-case orchestration only. UI, HTTP and provider SDK concerns are forbidden here. */
export class PermissionCheckService {
  constructor(private readonly repository: PermissionCheckRepository, private readonly now: () => Date = () => new Date()) {}
  async get(id: PermissionCheckId): Promise<PermissionCheck | null> { return this.repository.findById(id); }
  async save(record: PermissionCheck): Promise<PermissionCheck> { return this.repository.replace(record); }
}
