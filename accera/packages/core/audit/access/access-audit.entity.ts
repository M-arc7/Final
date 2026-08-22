import { invariant } from '../../shared/errors';
import { canTransitionStatus } from '../../shared/rules';
import { newId } from '../../shared/primitives';
import type { CreateAccessAuditInput, AccessAudit, AccessAuditStatus } from './access-audit.types';

/** Pure access-audit representation and invariants; no database or provider access. */
export const createAccessAudit = (input: CreateAccessAuditInput, now = new Date()): AccessAudit => ({ id: input.id ?? newId<'AccessAuditId'>(), status: 'active', metadata: input.metadata ?? {}, createdAt: now, updatedAt: now });
export const transitionAccessAuditStatus = (record: AccessAudit, status: AccessAuditStatus, now = new Date()): AccessAudit => { invariant(canTransitionStatus(record.status, status), 'access-audit.invalid_status_transition', 'The requested lifecycle transition is not allowed.', { from: record.status, to: status }); return { ...record, status, updatedAt: now }; };
