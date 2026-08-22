import { CoreError } from '../../shared/errors';
import { createComplianceEvent, transitionComplianceEventStatus } from './compliance-event.entity';
import type { ComplianceEventRepository } from './compliance-event.repository';
import type { CreateComplianceEventInput, ComplianceEvent, ComplianceEventId, ComplianceEventStatus } from './compliance-event.types';

/** Use-case orchestration only. UI, HTTP and provider SDK concerns are forbidden here. */
export class ComplianceEventService {
  constructor(private readonly repository: ComplianceEventRepository, private readonly now: () => Date = () => new Date()) {}
  async get(id: ComplianceEventId): Promise<ComplianceEvent | null> { return this.repository.findById(id); }
  async create(input: CreateComplianceEventInput): Promise<ComplianceEvent> { return this.repository.insert(createComplianceEvent(input, this.now())); }
  async changeStatus(id: ComplianceEventId, status: ComplianceEventStatus): Promise<ComplianceEvent> { const record = await this.repository.findById(id); if (!record) throw new CoreError('compliance-event.not_found', 'The requested record does not exist.', { id }); return this.repository.replace(transitionComplianceEventStatus(record, status, this.now())); }
}
