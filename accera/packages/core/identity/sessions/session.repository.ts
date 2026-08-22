import type { Repository } from '../../shared/repository';
import type { Session, SessionId } from './session.types';

/** Persistence port only. Database queries and adapter details live outside core. */
export interface SessionRepository extends Repository<SessionId, Session> {}
