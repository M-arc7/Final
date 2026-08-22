import { invariant } from '../../shared/errors';
import { canTransitionStatus } from '../../shared/rules';
import { newId } from '../../shared/primitives';
import type { CreatePermissionGroupInput, PermissionGroup, PermissionGroupStatus } from './permission-group.types';

/** Pure permission-group representation and invariants; no database or provider access. */
export const createPermissionGroup = (input: CreatePermissionGroupInput, now = new Date()): PermissionGroup => ({ id: input.id ?? newId<'PermissionGroupId'>(), status: 'active', metadata: input.metadata ?? {}, createdAt: now, updatedAt: now });
export const transitionPermissionGroupStatus = (record: PermissionGroup, status: PermissionGroupStatus, now = new Date()): PermissionGroup => { invariant(canTransitionStatus(record.status, status), 'permission-group.invalid_status_transition', 'The requested lifecycle transition is not allowed.', { from: record.status, to: status }); return { ...record, status, updatedAt: now }; };
