import { CoreError } from '../../shared/errors';
import { createMembershipType, transitionMembershipTypeStatus } from './membership-type.entity';
import type { MembershipTypeRepository } from './membership-type.repository';
import type { CreateMembershipTypeInput, MembershipType, MembershipTypeId, MembershipTypeStatus } from './membership-type.types';

/** Use-case orchestration only. UI, HTTP and provider SDK concerns are forbidden here. */
export class MembershipTypeService {
  constructor(private readonly repository: MembershipTypeRepository, private readonly now: () => Date = () => new Date()) {}
  async get(id: MembershipTypeId): Promise<MembershipType | null> { return this.repository.findById(id); }
  async create(input: CreateMembershipTypeInput): Promise<MembershipType> { return this.repository.insert(createMembershipType(input, this.now())); }
  async changeStatus(id: MembershipTypeId, status: MembershipTypeStatus): Promise<MembershipType> { const record = await this.repository.findById(id); if (!record) throw new CoreError('membership-type.not_found', 'The requested record does not exist.', { id }); return this.repository.replace(transitionMembershipTypeStatus(record, status, this.now())); }
}
