import { CoreError } from '../../shared/errors';
import { createMembershipRenewal, transitionMembershipRenewalStatus } from './membership-renewal.entity';
import type { MembershipRenewalRepository } from './membership-renewal.repository';
import type { CreateMembershipRenewalInput, MembershipRenewal, MembershipRenewalId, MembershipRenewalStatus } from './membership-renewal.types';

/** Use-case orchestration only. UI, HTTP and provider SDK concerns are forbidden here. */
export class MembershipRenewalService {
  constructor(private readonly repository: MembershipRenewalRepository, private readonly now: () => Date = () => new Date()) {}
  async get(id: MembershipRenewalId): Promise<MembershipRenewal | null> { return this.repository.findById(id); }
  async create(input: CreateMembershipRenewalInput): Promise<MembershipRenewal> { return this.repository.insert(createMembershipRenewal(input, this.now())); }
  async changeStatus(id: MembershipRenewalId, status: MembershipRenewalStatus): Promise<MembershipRenewal> { const record = await this.repository.findById(id); if (!record) throw new CoreError('membership-renewal.not_found', 'The requested record does not exist.', { id }); return this.repository.replace(transitionMembershipRenewalStatus(record, status, this.now())); }
}
