import { invariant } from "../../shared/errors";
import { newId } from "../../shared/primitives";
import type { Session, SessionCreateInput } from "./session.types";
export const createSession = (
  input: SessionCreateInput,
  now = new Date(),
): Session => {
  invariant(
    input.expiresAt > now,
    "session.invalid_expiry",
    "A session expiry must be in the future.",
  );
  return {
    id: input.id ?? newId<"SessionId">(),
    accountId: input.accountId,
    deviceId: input.deviceId,
    status: "active",
    lastActivityAt: now,
    expiresAt: input.expiresAt,
    ipMetadata: input.ipMetadata,
    createdAt: now,
    updatedAt: now,
  };
};
export const revokeSession = (session: Session, now = new Date()): Session => ({
  ...session,
  status: "revoked",
  revokedAt: now,
  updatedAt: now,
});
export const isUsableSession = (session: Session, now = new Date()) =>
  session.status === "active" && session.expiresAt > now;
export const refreshSession = (
  session: Session,
  expiresAt: Date,
  now = new Date(),
): Session => {
  invariant(
    isUsableSession(session, now),
    "session.not_refreshable",
    "The session cannot be refreshed.",
  );
  invariant(
    expiresAt > now,
    "session.invalid_expiry",
    "A session expiry must be in the future.",
  );
  return { ...session, expiresAt, lastActivityAt: now, updatedAt: now };
};
