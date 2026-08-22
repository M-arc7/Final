import { invariant } from '../../shared/errors';
import { canTransitionStatus } from '../../shared/rules';
import { newId } from '../../shared/primitives';
import type { CreateAuditLogInput, AuditLog, AuditLogStatus } from './audit-log.types';

/** Pure audit-log representation and invariants; no database or provider access. */
export const createAuditLog = (input: CreateAuditLogInput, now = new Date()): AuditLog => ({ id: input.id ?? newId<'AuditLogId'>(), status: 'active', metadata: input.metadata ?? {}, createdAt: now, updatedAt: now });
export const transitionAuditLogStatus = (record: AuditLog, status: AuditLogStatus, now = new Date()): AuditLog => { invariant(canTransitionStatus(record.status, status), 'audit-log.invalid_status_transition', 'The requested lifecycle transition is not allowed.', { from: record.status, to: status }); return { ...record, status, updatedAt: now }; };
