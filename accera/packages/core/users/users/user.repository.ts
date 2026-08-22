import type { Repository } from '../../shared/repository';
import type { User, UserId } from './user.types';

/** Persistence port only. Database queries and adapter details live outside core. */
export interface UserRepository extends Repository<UserId, User> {}
