import { invariant } from '../../shared/errors';
import { canTransitionStatus } from '../../shared/rules';
import { newId } from '../../shared/primitives';
import type { CreateComplianceEventInput, ComplianceEvent, ComplianceEventStatus } from './compliance-event.types';

/** Pure compliance-event representation and invariants; no database or provider access. */
export const createComplianceEvent = (input: CreateComplianceEventInput, now = new Date()): ComplianceEvent => ({ id: input.id ?? newId<'ComplianceEventId'>(), status: 'active', metadata: input.metadata ?? {}, createdAt: now, updatedAt: now });
export const transitionComplianceEventStatus = (record: ComplianceEvent, status: ComplianceEventStatus, now = new Date()): ComplianceEvent => { invariant(canTransitionStatus(record.status, status), 'compliance-event.invalid_status_transition', 'The requested lifecycle transition is not allowed.', { from: record.status, to: status }); return { ...record, status, updatedAt: now }; };
