import type { Repository } from '../../shared/repository';
import type { Message, MessageId } from './message.types';

/** Persistence port only. Database queries and adapter details live outside core. */
export interface MessageRepository extends Repository<MessageId, Message> {}
