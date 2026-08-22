import { CoreError } from '../../shared/errors';
import { createAuditLog, transitionAuditLogStatus } from './audit-log.entity';
import type { AuditLogRepository } from './audit-log.repository';
import type { CreateAuditLogInput, AuditLog, AuditLogId, AuditLogStatus } from './audit-log.types';

/** Use-case orchestration only. UI, HTTP and provider SDK concerns are forbidden here. */
export class AuditLogService {
  constructor(private readonly repository: AuditLogRepository, private readonly now: () => Date = () => new Date()) {}
  async get(id: AuditLogId): Promise<AuditLog | null> { return this.repository.findById(id); }
  async create(input: CreateAuditLogInput): Promise<AuditLog> { return this.repository.insert(createAuditLog(input, this.now())); }
  async changeStatus(id: AuditLogId, status: AuditLogStatus): Promise<AuditLog> { const record = await this.repository.findById(id); if (!record) throw new CoreError('audit-log.not_found', 'The requested record does not exist.', { id }); return this.repository.replace(transitionAuditLogStatus(record, status, this.now())); }
}
