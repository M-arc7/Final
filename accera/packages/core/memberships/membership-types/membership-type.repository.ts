import type { Repository } from '../../shared/repository';
import type { MembershipType, MembershipTypeId } from './membership-type.types';

/** Persistence port only. Database queries and adapter details live outside core. */
export interface MembershipTypeRepository extends Repository<MembershipTypeId, MembershipType> {}
