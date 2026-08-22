import { invariant } from '../../shared/errors';
import { canTransitionStatus } from '../../shared/rules';
import { newId } from '../../shared/primitives';
import type { CreateAuditEventInput, AuditEvent, AuditEventStatus } from './audit-event.types';

/** Pure audit-event representation and invariants; no database or provider access. */
export const createAuditEvent = (input: CreateAuditEventInput, now = new Date()): AuditEvent => ({ id: input.id ?? newId<'AuditEventId'>(), status: 'active', metadata: input.metadata ?? {}, createdAt: now, updatedAt: now });
export const transitionAuditEventStatus = (record: AuditEvent, status: AuditEventStatus, now = new Date()): AuditEvent => { invariant(canTransitionStatus(record.status, status), 'audit-event.invalid_status_transition', 'The requested lifecycle transition is not allowed.', { from: record.status, to: status }); return { ...record, status, updatedAt: now }; };
