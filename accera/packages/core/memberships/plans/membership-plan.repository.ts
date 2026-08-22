import type { Repository } from '../../shared/repository';
import type { MembershipPlan, MembershipPlanId } from './membership-plan.types';

/** Persistence port only. Database queries and adapter details live outside core. */
export interface MembershipPlanRepository extends Repository<MembershipPlanId, MembershipPlan> {}
