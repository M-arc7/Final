import type { Repository } from '../../shared/repository';
import type { Membership, MembershipId } from './membership.types';

/** Persistence port only. Database queries and adapter details live outside core. */
export interface MembershipRepository extends Repository<MembershipId, Membership> {}
