import { invariant } from '../../shared/errors';
import { canTransitionStatus } from '../../shared/rules';
import { newId } from '../../shared/primitives';
import type { CreateConversationInput, Conversation, ConversationStatus } from './conversation.types';

/** Pure conversation representation and invariants; no database or provider access. */
export const createConversation = (input: CreateConversationInput, now = new Date()): Conversation => ({ id: input.id ?? newId<'ConversationId'>(), status: 'active', metadata: input.metadata ?? {}, createdAt: now, updatedAt: now });
export const transitionConversationStatus = (record: Conversation, status: ConversationStatus, now = new Date()): Conversation => { invariant(canTransitionStatus(record.status, status), 'conversation.invalid_status_transition', 'The requested lifecycle transition is not allowed.', { from: record.status, to: status }); return { ...record, status, updatedAt: now }; };
