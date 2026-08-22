import { CoreError } from '../../shared/errors';
import { createSession, transitionSessionStatus } from './session.entity';
import type { SessionRepository } from './session.repository';
import type { CreateSessionInput, Session, SessionId, SessionStatus } from './session.types';

/** Use-case orchestration only. UI, HTTP and provider SDK concerns are forbidden here. */
export class SessionService {
  constructor(private readonly repository: SessionRepository, private readonly now: () => Date = () => new Date()) {}
  async get(id: SessionId): Promise<Session | null> { return this.repository.findById(id); }
  async create(input: CreateSessionInput): Promise<Session> { return this.repository.insert(createSession(input, this.now())); }
  async changeStatus(id: SessionId, status: SessionStatus): Promise<Session> { const record = await this.repository.findById(id); if (!record) throw new CoreError('session.not_found', 'The requested record does not exist.', { id }); return this.repository.replace(transitionSessionStatus(record, status, this.now())); }
}
