import { CoreError } from '../../shared/errors';
import { createAuditEvent, transitionAuditEventStatus } from './audit-event.entity';
import type { AuditEventRepository } from './audit-event.repository';
import type { CreateAuditEventInput, AuditEvent, AuditEventId, AuditEventStatus } from './audit-event.types';

/** Use-case orchestration only. UI, HTTP and provider SDK concerns are forbidden here. */
export class AuditEventService {
  constructor(private readonly repository: AuditEventRepository, private readonly now: () => Date = () => new Date()) {}
  async get(id: AuditEventId): Promise<AuditEvent | null> { return this.repository.findById(id); }
  async create(input: CreateAuditEventInput): Promise<AuditEvent> { return this.repository.insert(createAuditEvent(input, this.now())); }
  async changeStatus(id: AuditEventId, status: AuditEventStatus): Promise<AuditEvent> { const record = await this.repository.findById(id); if (!record) throw new CoreError('audit-event.not_found', 'The requested record does not exist.', { id }); return this.repository.replace(transitionAuditEventStatus(record, status, this.now())); }
}
