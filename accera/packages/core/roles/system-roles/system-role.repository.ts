import type { Repository } from '../../shared/repository';
import type { SystemRole, SystemRoleId } from './system-role.types';

/** Persistence port only. Database queries and adapter details live outside core. */
export interface SystemRoleRepository extends Repository<SystemRoleId, SystemRole> {}
