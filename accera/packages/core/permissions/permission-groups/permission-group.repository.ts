import type { Repository } from '../../shared/repository';
import type { PermissionGroup, PermissionGroupId } from './permission-group.types';

/** Persistence port only. Database queries and adapter details live outside core. */
export interface PermissionGroupRepository extends Repository<PermissionGroupId, PermissionGroup> {}
