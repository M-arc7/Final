import type { Repository } from '../../shared/repository';
import type { Conversation, ConversationId } from './conversation.types';

/** Persistence port only. Database queries and adapter details live outside core. */
export interface ConversationRepository extends Repository<ConversationId, Conversation> {}
