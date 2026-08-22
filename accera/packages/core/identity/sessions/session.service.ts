import { CoreError } from "../../shared/errors";
import {
  createSession,
  isUsableSession,
  refreshSession,
  revokeSession,
} from "./session.entity";
import type { SessionRepository } from "./session.repository";
import type { Session, SessionCreateInput, SessionId } from "./session.types";

export class SessionService {
  constructor(
    private readonly repository: SessionRepository,
    private readonly now: () => Date = () => new Date(),
  ) {}
  async create(input: SessionCreateInput): Promise<Session> {
    return this.repository.create(createSession(input, this.now()));
  }
  async get(id: SessionId): Promise<Session | null> {
    return this.repository.findById(id);
  }
  async validate(id: SessionId): Promise<Session> {
    const session = await this.repository.findById(id);
    if (!session || !isUsableSession(session, this.now()))
      throw new CoreError("session.invalid", "The session is not active.", {});
    return session;
  }
  async refresh(id: SessionId, expiresAt: Date): Promise<Session> {
    const session = await this.validate(id);
    return this.repository.update(
      refreshSession(session, expiresAt, this.now()),
    );
  }
  async revoke(id: SessionId): Promise<void> {
    const session = await this.repository.findById(id);
    if (session)
      await this.repository.update(revokeSession(session, this.now()));
  }
  async revokeAll(accountId: Session["accountId"]): Promise<void> {
    await this.repository.revokeAllForAccount(accountId);
  }
}
