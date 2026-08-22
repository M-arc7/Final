import { invariant } from '../../shared/errors';
import { canTransitionStatus } from '../../shared/rules';
import { newId } from '../../shared/primitives';
import type { CreateFileFolderInput, FileFolder, FileFolderStatus } from './file-folder.types';

/** Pure file-folder representation and invariants; no database or provider access. */
export const createFileFolder = (input: CreateFileFolderInput, now = new Date()): FileFolder => ({ id: input.id ?? newId<'FileFolderId'>(), status: 'active', metadata: input.metadata ?? {}, createdAt: now, updatedAt: now });
export const transitionFileFolderStatus = (record: FileFolder, status: FileFolderStatus, now = new Date()): FileFolder => { invariant(canTransitionStatus(record.status, status), 'file-folder.invalid_status_transition', 'The requested lifecycle transition is not allowed.', { from: record.status, to: status }); return { ...record, status, updatedAt: now }; };
