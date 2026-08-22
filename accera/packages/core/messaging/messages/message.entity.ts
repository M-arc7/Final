import { invariant } from '../../shared/errors';
import { canTransitionStatus } from '../../shared/rules';
import { newId } from '../../shared/primitives';
import type { CreateMessageInput, Message, MessageStatus } from './message.types';

/** Pure message representation and invariants; no database or provider access. */
export const createMessage = (input: CreateMessageInput, now = new Date()): Message => ({ id: input.id ?? newId<'MessageId'>(), status: 'active', metadata: input.metadata ?? {}, createdAt: now, updatedAt: now });
export const transitionMessageStatus = (record: Message, status: MessageStatus, now = new Date()): Message => { invariant(canTransitionStatus(record.status, status), 'message.invalid_status_transition', 'The requested lifecycle transition is not allowed.', { from: record.status, to: status }); return { ...record, status, updatedAt: now }; };
