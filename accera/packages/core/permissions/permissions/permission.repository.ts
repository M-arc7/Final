import type { Repository } from '../../shared/repository';
import type { Permission, PermissionId } from './permission.types';

/** Persistence port only. Database queries and adapter details live outside core. */
export interface PermissionRepository extends Repository<PermissionId, Permission> {}
