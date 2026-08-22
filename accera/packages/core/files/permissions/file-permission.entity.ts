import { invariant } from '../../shared/errors';
import { canTransitionStatus } from '../../shared/rules';
import { newId } from '../../shared/primitives';
import type { CreateFilePermissionInput, FilePermission, FilePermissionStatus } from './file-permission.types';

/** Pure file-permission representation and invariants; no database or provider access. */
export const createFilePermission = (input: CreateFilePermissionInput, now = new Date()): FilePermission => ({ id: input.id ?? newId<'FilePermissionId'>(), status: 'active', metadata: input.metadata ?? {}, createdAt: now, updatedAt: now });
export const transitionFilePermissionStatus = (record: FilePermission, status: FilePermissionStatus, now = new Date()): FilePermission => { invariant(canTransitionStatus(record.status, status), 'file-permission.invalid_status_transition', 'The requested lifecycle transition is not allowed.', { from: record.status, to: status }); return { ...record, status, updatedAt: now }; };
