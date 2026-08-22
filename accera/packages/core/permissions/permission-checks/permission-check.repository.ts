import type { Repository } from '../../shared/repository';
import type { PermissionCheck, PermissionCheckId } from './permission-check.types';

/** Persistence port only. Database queries and adapter details live outside core. */
export interface PermissionCheckRepository extends Repository<PermissionCheckId, PermissionCheck> {}
