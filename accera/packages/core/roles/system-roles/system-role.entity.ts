import { invariant } from '../../shared/errors';
import { canTransitionStatus } from '../../shared/rules';
import { newId } from '../../shared/primitives';
import type { CreateSystemRoleInput, SystemRole, SystemRoleStatus } from './system-role.types';

/** Pure system-role representation and invariants; no database or provider access. */
export const createSystemRole = (input: CreateSystemRoleInput, now = new Date()): SystemRole => ({ id: input.id ?? newId<'SystemRoleId'>(), status: 'active', metadata: input.metadata ?? {}, createdAt: now, updatedAt: now });
export const transitionSystemRoleStatus = (record: SystemRole, status: SystemRoleStatus, now = new Date()): SystemRole => { invariant(canTransitionStatus(record.status, status), 'system-role.invalid_status_transition', 'The requested lifecycle transition is not allowed.', { from: record.status, to: status }); return { ...record, status, updatedAt: now }; };
