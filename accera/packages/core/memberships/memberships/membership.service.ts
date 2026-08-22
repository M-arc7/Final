import { CoreError } from '../../shared/errors';
import { createMembership, transitionMembershipStatus } from './membership.entity';
import type { MembershipRepository } from './membership.repository';
import type { CreateMembershipInput, Membership, MembershipId, MembershipStatus } from './membership.types';

/** Use-case orchestration only. UI, HTTP and provider SDK concerns are forbidden here. */
export class MembershipService {
  constructor(private readonly repository: MembershipRepository, private readonly now: () => Date = () => new Date()) {}
  async get(id: MembershipId): Promise<Membership | null> { return this.repository.findById(id); }
  async create(input: CreateMembershipInput): Promise<Membership> { return this.repository.insert(createMembership(input, this.now())); }
  async changeStatus(id: MembershipId, status: MembershipStatus): Promise<Membership> { const record = await this.repository.findById(id); if (!record) throw new CoreError('membership.not_found', 'The requested record does not exist.', { id }); return this.repository.replace(transitionMembershipStatus(record, status, this.now())); }
}
