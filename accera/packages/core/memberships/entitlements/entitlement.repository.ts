import type { Repository } from '../../shared/repository';
import type { Entitlement, EntitlementId } from './entitlement.types';

/** Persistence port only. Database queries and adapter details live outside core. */
export interface EntitlementRepository extends Repository<EntitlementId, Entitlement> {}
