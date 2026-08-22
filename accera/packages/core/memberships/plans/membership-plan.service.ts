import { CoreError } from '../../shared/errors';
import { createMembershipPlan, transitionMembershipPlanStatus } from './membership-plan.entity';
import type { MembershipPlanRepository } from './membership-plan.repository';
import type { CreateMembershipPlanInput, MembershipPlan, MembershipPlanId, MembershipPlanStatus } from './membership-plan.types';

/** Use-case orchestration only. UI, HTTP and provider SDK concerns are forbidden here. */
export class MembershipPlanService {
  constructor(private readonly repository: MembershipPlanRepository, private readonly now: () => Date = () => new Date()) {}
  async get(id: MembershipPlanId): Promise<MembershipPlan | null> { return this.repository.findById(id); }
  async create(input: CreateMembershipPlanInput): Promise<MembershipPlan> { return this.repository.insert(createMembershipPlan(input, this.now())); }
  async changeStatus(id: MembershipPlanId, status: MembershipPlanStatus): Promise<MembershipPlan> { const record = await this.repository.findById(id); if (!record) throw new CoreError('membership-plan.not_found', 'The requested record does not exist.', { id }); return this.repository.replace(transitionMembershipPlanStatus(record, status, this.now())); }
}
