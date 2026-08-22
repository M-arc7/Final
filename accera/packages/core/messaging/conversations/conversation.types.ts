import type { Brand, EntityStatus, Metadata, Timestamped } from '../../shared/primitives';

/** Type contracts only; runtime validation belongs in conversation.schema.ts. */
export type ConversationId = Brand<string, 'ConversationId'>;
export type ConversationStatus = EntityStatus;
export type Conversation = Readonly<{ id: ConversationId; status: ConversationStatus; metadata: Metadata } & Timestamped>;
export type CreateConversationInput = Readonly<{ id?: ConversationId; metadata?: Metadata }>;
export type UpdateConversationInput = Readonly<{ metadata?: Metadata }>;
