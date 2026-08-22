import type { AccountId } from "../account";
import type { Session, SessionId } from "./session.types";
export interface SessionRepository {
  create(session: Session): Promise<Session>;
  findById(id: SessionId): Promise<Session | null>;
  update(session: Session): Promise<Session>;
  revokeAllForAccount(accountId: AccountId): Promise<void>;
  listActiveForAccount(accountId: AccountId): Promise<readonly Session[]>;
}
