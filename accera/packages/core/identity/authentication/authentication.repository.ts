import type { Repository } from '../../shared/repository';
import type { Authentication, AuthenticationId } from './authentication.types';

/** Persistence port only. Database queries and adapter details live outside core. */
export interface AuthenticationRepository extends Repository<AuthenticationId, Authentication> {}
