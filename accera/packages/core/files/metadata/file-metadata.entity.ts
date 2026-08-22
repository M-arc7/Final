import { invariant } from '../../shared/errors';
import { canTransitionStatus } from '../../shared/rules';
import { newId } from '../../shared/primitives';
import type { CreateFileMetadataInput, FileMetadata, FileMetadataStatus } from './file-metadata.types';

/** Pure file-metadata representation and invariants; no database or provider access. */
export const createFileMetadata = (input: CreateFileMetadataInput, now = new Date()): FileMetadata => ({ id: input.id ?? newId<'FileMetadataId'>(), status: 'active', metadata: input.metadata ?? {}, createdAt: now, updatedAt: now });
export const transitionFileMetadataStatus = (record: FileMetadata, status: FileMetadataStatus, now = new Date()): FileMetadata => { invariant(canTransitionStatus(record.status, status), 'file-metadata.invalid_status_transition', 'The requested lifecycle transition is not allowed.', { from: record.status, to: status }); return { ...record, status, updatedAt: now }; };
