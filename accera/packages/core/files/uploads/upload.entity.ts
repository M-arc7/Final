import { invariant } from '../../shared/errors';
import { canTransitionStatus } from '../../shared/rules';
import { newId } from '../../shared/primitives';
import type { CreateUploadInput, Upload, UploadStatus } from './upload.types';

/** Pure upload representation and invariants; no database or provider access. */
export const createUpload = (input: CreateUploadInput, now = new Date()): Upload => ({ id: input.id ?? newId<'UploadId'>(), status: 'active', metadata: input.metadata ?? {}, createdAt: now, updatedAt: now });
export const transitionUploadStatus = (record: Upload, status: UploadStatus, now = new Date()): Upload => { invariant(canTransitionStatus(record.status, status), 'upload.invalid_status_transition', 'The requested lifecycle transition is not allowed.', { from: record.status, to: status }); return { ...record, status, updatedAt: now }; };
