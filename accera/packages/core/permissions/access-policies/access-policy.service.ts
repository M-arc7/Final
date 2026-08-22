import { CoreError } from '../../shared/errors';
import { createAccessPolicy, transitionAccessPolicyStatus } from './access-policy.entity';
import type { AccessPolicyRepository } from './access-policy.repository';
import type { CreateAccessPolicyInput, AccessPolicy, AccessPolicyId, AccessPolicyStatus } from './access-policy.types';

/** Use-case orchestration only. UI, HTTP and provider SDK concerns are forbidden here. */
export class AccessPolicyService {
  constructor(private readonly repository: AccessPolicyRepository, private readonly now: () => Date = () => new Date()) {}
  async get(id: AccessPolicyId): Promise<AccessPolicy | null> { return this.repository.findById(id); }
  async create(input: CreateAccessPolicyInput): Promise<AccessPolicy> { return this.repository.insert(createAccessPolicy(input, this.now())); }
  async changeStatus(id: AccessPolicyId, status: AccessPolicyStatus): Promise<AccessPolicy> { const record = await this.repository.findById(id); if (!record) throw new CoreError('access-policy.not_found', 'The requested record does not exist.', { id }); return this.repository.replace(transitionAccessPolicyStatus(record, status, this.now())); }
}
