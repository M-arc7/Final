import type { Repository } from '../../shared/repository';
import type { Verification, VerificationId } from './verification.types';

/** Persistence port only. Database queries and adapter details live outside core. */
export interface VerificationRepository extends Repository<VerificationId, Verification> {}
