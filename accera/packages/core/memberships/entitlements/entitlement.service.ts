import { CoreError } from '../../shared/errors';
import { createEntitlement, transitionEntitlementStatus } from './entitlement.entity';
import type { EntitlementRepository } from './entitlement.repository';
import type { CreateEntitlementInput, Entitlement, EntitlementId, EntitlementStatus } from './entitlement.types';

/** Use-case orchestration only. UI, HTTP and provider SDK concerns are forbidden here. */
export class EntitlementService {
  constructor(private readonly repository: EntitlementRepository, private readonly now: () => Date = () => new Date()) {}
  async get(id: EntitlementId): Promise<Entitlement | null> { return this.repository.findById(id); }
  async create(input: CreateEntitlementInput): Promise<Entitlement> { return this.repository.insert(createEntitlement(input, this.now())); }
  async changeStatus(id: EntitlementId, status: EntitlementStatus): Promise<Entitlement> { const record = await this.repository.findById(id); if (!record) throw new CoreError('entitlement.not_found', 'The requested record does not exist.', { id }); return this.repository.replace(transitionEntitlementStatus(record, status, this.now())); }
}
