import type { Repository } from '../../shared/repository';
import type { AuditEvent, AuditEventId } from './audit-event.types';

/** Persistence port only. Database queries and adapter details live outside core. */
export interface AuditEventRepository extends Repository<AuditEventId, AuditEvent> {}
