import type { Brand, EntityStatus, Metadata, Timestamped } from '../../shared/primitives';

/** Type contracts only; runtime validation belongs in message.schema.ts. */
export type MessageId = Brand<string, 'MessageId'>;
export type MessageStatus = EntityStatus;
export type Message = Readonly<{ id: MessageId; status: MessageStatus; metadata: Metadata } & Timestamped>;
export type CreateMessageInput = Readonly<{ id?: MessageId; metadata?: Metadata }>;
export type UpdateMessageInput = Readonly<{ metadata?: Metadata }>;
