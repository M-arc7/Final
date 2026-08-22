import type { Repository } from '../../shared/repository';
import type { MessageAttachment, MessageAttachmentId } from './message-attachment.types';

/** Persistence port only. Database queries and adapter details live outside core. */
export interface MessageAttachmentRepository extends Repository<MessageAttachmentId, MessageAttachment> {}
