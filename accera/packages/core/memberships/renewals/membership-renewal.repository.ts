import type { Repository } from '../../shared/repository';
import type { MembershipRenewal, MembershipRenewalId } from './membership-renewal.types';

/** Persistence port only. Database queries and adapter details live outside core. */
export interface MembershipRenewalRepository extends Repository<MembershipRenewalId, MembershipRenewal> {}
