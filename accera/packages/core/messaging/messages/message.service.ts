import { CoreError } from '../../shared/errors';
import { createMessage, transitionMessageStatus } from './message.entity';
import type { MessageRepository } from './message.repository';
import type { CreateMessageInput, Message, MessageId, MessageStatus } from './message.types';

/** Use-case orchestration only. UI, HTTP and provider SDK concerns are forbidden here. */
export class MessageService {
  constructor(private readonly repository: MessageRepository, private readonly now: () => Date = () => new Date()) {}
  async get(id: MessageId): Promise<Message | null> { return this.repository.findById(id); }
  async create(input: CreateMessageInput): Promise<Message> { return this.repository.insert(createMessage(input, this.now())); }
  async changeStatus(id: MessageId, status: MessageStatus): Promise<Message> { const record = await this.repository.findById(id); if (!record) throw new CoreError('message.not_found', 'The requested record does not exist.', { id }); return this.repository.replace(transitionMessageStatus(record, status, this.now())); }
}
