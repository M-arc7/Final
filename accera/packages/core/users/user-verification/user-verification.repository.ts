import type { Repository } from '../../shared/repository';
import type { UserVerification, UserVerificationId } from './user-verification.types';

/** Persistence port only. Database queries and adapter details live outside core. */
export interface UserVerificationRepository extends Repository<UserVerificationId, UserVerification> {}
