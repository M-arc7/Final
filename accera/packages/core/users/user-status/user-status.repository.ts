import type { Repository } from '../../shared/repository';
import type { UserStatus, UserStatusId } from './user-status.types';

/** Persistence port only. Database queries and adapter details live outside core. */
export interface UserStatusRepository extends Repository<UserStatusId, UserStatus> {}
