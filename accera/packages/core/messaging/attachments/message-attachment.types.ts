import type { Brand, EntityStatus, Metadata, Timestamped } from '../../shared/primitives';

/** Type contracts only; runtime validation belongs in message-attachment.schema.ts. */
export type MessageAttachmentId = Brand<string, 'MessageAttachmentId'>;
export type MessageAttachmentStatus = EntityStatus;
export type MessageAttachment = Readonly<{ id: MessageAttachmentId; status: MessageAttachmentStatus; metadata: Metadata } & Timestamped>;
export type CreateMessageAttachmentInput = Readonly<{ id?: MessageAttachmentId; metadata?: Metadata }>;
export type UpdateMessageAttachmentInput = Readonly<{ metadata?: Metadata }>;
