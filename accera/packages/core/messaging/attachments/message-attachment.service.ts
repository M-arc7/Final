import { CoreError } from '../../shared/errors';
import { createMessageAttachment, transitionMessageAttachmentStatus } from './message-attachment.entity';
import type { MessageAttachmentRepository } from './message-attachment.repository';
import type { CreateMessageAttachmentInput, MessageAttachment, MessageAttachmentId, MessageAttachmentStatus } from './message-attachment.types';

/** Use-case orchestration only. UI, HTTP and provider SDK concerns are forbidden here. */
export class MessageAttachmentService {
  constructor(private readonly repository: MessageAttachmentRepository, private readonly now: () => Date = () => new Date()) {}
  async get(id: MessageAttachmentId): Promise<MessageAttachment | null> { return this.repository.findById(id); }
  async create(input: CreateMessageAttachmentInput): Promise<MessageAttachment> { return this.repository.insert(createMessageAttachment(input, this.now())); }
  async changeStatus(id: MessageAttachmentId, status: MessageAttachmentStatus): Promise<MessageAttachment> { const record = await this.repository.findById(id); if (!record) throw new CoreError('message-attachment.not_found', 'The requested record does not exist.', { id }); return this.repository.replace(transitionMessageAttachmentStatus(record, status, this.now())); }
}
