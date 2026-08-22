import type { Repository } from '../../shared/repository';
import type { ComplianceEvent, ComplianceEventId } from './compliance-event.types';

/** Persistence port only. Database queries and adapter details live outside core. */
export interface ComplianceEventRepository extends Repository<ComplianceEventId, ComplianceEvent> {}
