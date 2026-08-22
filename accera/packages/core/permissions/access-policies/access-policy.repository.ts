import type { Repository } from '../../shared/repository';
import type { AccessPolicy, AccessPolicyId } from './access-policy.types';

/** Persistence port only. Database queries and adapter details live outside core. */
export interface AccessPolicyRepository extends Repository<AccessPolicyId, AccessPolicy> {}
