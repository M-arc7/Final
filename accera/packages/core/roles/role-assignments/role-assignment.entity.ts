import { invariant } from '../../shared/errors';
import { canTransitionStatus } from '../../shared/rules';
import { newId } from '../../shared/primitives';
import type { CreateRoleAssignmentInput, RoleAssignment, RoleAssignmentStatus } from './role-assignment.types';

/** Pure role-assignment representation and invariants; no database or provider access. */
export const createRoleAssignment = (input: CreateRoleAssignmentInput, now = new Date()): RoleAssignment => ({ id: input.id ?? newId<'RoleAssignmentId'>(), status: 'active', metadata: input.metadata ?? {}, createdAt: now, updatedAt: now });
export const transitionRoleAssignmentStatus = (record: RoleAssignment, status: RoleAssignmentStatus, now = new Date()): RoleAssignment => { invariant(canTransitionStatus(record.status, status), 'role-assignment.invalid_status_transition', 'The requested lifecycle transition is not allowed.', { from: record.status, to: status }); return { ...record, status, updatedAt: now }; };
