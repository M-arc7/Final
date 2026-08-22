import { invariant } from '../../shared/errors';
import { canTransitionStatus } from '../../shared/rules';
import { newId } from '../../shared/primitives';
import type { CreatePermissionInput, Permission, PermissionStatus } from './permission.types';

/** Pure permission representation and invariants; no database or provider access. */
export const createPermission = (input: CreatePermissionInput, now = new Date()): Permission => ({ id: input.id ?? newId<'PermissionId'>(), status: 'active', metadata: input.metadata ?? {}, createdAt: now, updatedAt: now });
export const transitionPermissionStatus = (record: Permission, status: PermissionStatus, now = new Date()): Permission => { invariant(canTransitionStatus(record.status, status), 'permission.invalid_status_transition', 'The requested lifecycle transition is not allowed.', { from: record.status, to: status }); return { ...record, status, updatedAt: now }; };
