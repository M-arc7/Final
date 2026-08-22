import type { Repository } from '../../shared/repository';
import type { AuditLog, AuditLogId } from './audit-log.types';

/** Persistence port only. Database queries and adapter details live outside core. */
export interface AuditLogRepository extends Repository<AuditLogId, AuditLog> {}
