import type { Repository } from '../../shared/repository';
import type { FilePermission, FilePermissionId } from './file-permission.types';

/** Persistence port only. Database queries and adapter details live outside core. */
export interface FilePermissionRepository extends Repository<FilePermissionId, FilePermission> {}
