import { invariant } from '../../shared/errors';
import { canTransitionStatus } from '../../shared/rules';
import { newId } from '../../shared/primitives';
import type { CreateMessageAttachmentInput, MessageAttachment, MessageAttachmentStatus } from './message-attachment.types';

/** Pure message-attachment representation and invariants; no database or provider access. */
export const createMessageAttachment = (input: CreateMessageAttachmentInput, now = new Date()): MessageAttachment => ({ id: input.id ?? newId<'MessageAttachmentId'>(), status: 'active', metadata: input.metadata ?? {}, createdAt: now, updatedAt: now });
export const transitionMessageAttachmentStatus = (record: MessageAttachment, status: MessageAttachmentStatus, now = new Date()): MessageAttachment => { invariant(canTransitionStatus(record.status, status), 'message-attachment.invalid_status_transition', 'The requested lifecycle transition is not allowed.', { from: record.status, to: status }); return { ...record, status, updatedAt: now }; };
