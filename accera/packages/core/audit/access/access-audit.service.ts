import { CoreError } from '../../shared/errors';
import { createAccessAudit, transitionAccessAuditStatus } from './access-audit.entity';
import type { AccessAuditRepository } from './access-audit.repository';
import type { CreateAccessAuditInput, AccessAudit, AccessAuditId, AccessAuditStatus } from './access-audit.types';

/** Use-case orchestration only. UI, HTTP and provider SDK concerns are forbidden here. */
export class AccessAuditService {
  constructor(private readonly repository: AccessAuditRepository, private readonly now: () => Date = () => new Date()) {}
  async get(id: AccessAuditId): Promise<AccessAudit | null> { return this.repository.findById(id); }
  async create(input: CreateAccessAuditInput): Promise<AccessAudit> { return this.repository.insert(createAccessAudit(input, this.now())); }
  async changeStatus(id: AccessAuditId, status: AccessAuditStatus): Promise<AccessAudit> { const record = await this.repository.findById(id); if (!record) throw new CoreError('access-audit.not_found', 'The requested record does not exist.', { id }); return this.repository.replace(transitionAccessAuditStatus(record, status, this.now())); }
}
