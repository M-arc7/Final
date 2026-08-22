import type { Repository } from '../../shared/repository';
import type { AccessAudit, AccessAuditId } from './access-audit.types';

/** Persistence port only. Database queries and adapter details live outside core. */
export interface AccessAuditRepository extends Repository<AccessAuditId, AccessAudit> {}
