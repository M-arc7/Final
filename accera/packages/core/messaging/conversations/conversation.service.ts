import { CoreError } from '../../shared/errors';
import { createConversation, transitionConversationStatus } from './conversation.entity';
import type { ConversationRepository } from './conversation.repository';
import type { CreateConversationInput, Conversation, ConversationId, ConversationStatus } from './conversation.types';

/** Use-case orchestration only. UI, HTTP and provider SDK concerns are forbidden here. */
export class ConversationService {
  constructor(private readonly repository: ConversationRepository, private readonly now: () => Date = () => new Date()) {}
  async get(id: ConversationId): Promise<Conversation | null> { return this.repository.findById(id); }
  async create(input: CreateConversationInput): Promise<Conversation> { return this.repository.insert(createConversation(input, this.now())); }
  async changeStatus(id: ConversationId, status: ConversationStatus): Promise<Conversation> { const record = await this.repository.findById(id); if (!record) throw new CoreError('conversation.not_found', 'The requested record does not exist.', { id }); return this.repository.replace(transitionConversationStatus(record, status, this.now())); }
}
