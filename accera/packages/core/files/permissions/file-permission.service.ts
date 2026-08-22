import { CoreError } from '../../shared/errors';
import { createFilePermission, transitionFilePermissionStatus } from './file-permission.entity';
import type { FilePermissionRepository } from './file-permission.repository';
import type { CreateFilePermissionInput, FilePermission, FilePermissionId, FilePermissionStatus } from './file-permission.types';

/** Use-case orchestration only. UI, HTTP and provider SDK concerns are forbidden here. */
export class FilePermissionService {
  constructor(private readonly repository: FilePermissionRepository, private readonly now: () => Date = () => new Date()) {}
  async get(id: FilePermissionId): Promise<FilePermission | null> { return this.repository.findById(id); }
  async create(input: CreateFilePermissionInput): Promise<FilePermission> { return this.repository.insert(createFilePermission(input, this.now())); }
  async changeStatus(id: FilePermissionId, status: FilePermissionStatus): Promise<FilePermission> { const record = await this.repository.findById(id); if (!record) throw new CoreError('file-permission.not_found', 'The requested record does not exist.', { id }); return this.repository.replace(transitionFilePermissionStatus(record, status, this.now())); }
}
