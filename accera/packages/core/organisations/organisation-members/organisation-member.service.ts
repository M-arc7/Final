import { CoreError } from '../../shared/errors';
import { createOrganisationMember, transitionOrganisationMemberStatus } from './organisation-member.entity';
import type { OrganisationMemberRepository } from './organisation-member.repository';
import type { CreateOrganisationMemberInput, OrganisationMember, OrganisationMemberId, OrganisationMemberStatus } from './organisation-member.types';

/** Use-case orchestration only. UI, HTTP and provider SDK concerns are forbidden here. */
export class OrganisationMemberService {
  constructor(private readonly repository: OrganisationMemberRepository, private readonly now: () => Date = () => new Date()) {}
  async get(id: OrganisationMemberId): Promise<OrganisationMember | null> { return this.repository.findById(id); }
  async create(input: CreateOrganisationMemberInput): Promise<OrganisationMember> { return this.repository.insert(createOrganisationMember(input, this.now())); }
  async changeStatus(id: OrganisationMemberId, status: OrganisationMemberStatus): Promise<OrganisationMember> { const record = await this.repository.findById(id); if (!record) throw new CoreError('organisation-member.not_found', 'The requested record does not exist.', { id }); return this.repository.replace(transitionOrganisationMemberStatus(record, status, this.now())); }
}
