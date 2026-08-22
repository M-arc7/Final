import type { AccountId } from "../account";
import type { DeviceId } from "../devices";
import type { Brand, Metadata, Timestamped } from "../../shared/primitives";
export type SessionId = Brand<string, "SessionId">;
export type SessionStatus = "active" | "expired" | "revoked";
export type Session = Readonly<
  {
    id: SessionId;
    accountId: AccountId;
    deviceId?: DeviceId;
    status: SessionStatus;
    lastActivityAt: Date;
    expiresAt: Date;
    revokedAt?: Date;
    ipMetadata?: Metadata;
  } & Timestamped
>;
export type SessionCreateInput = Readonly<{
  id?: SessionId;
  accountId: AccountId;
  deviceId?: DeviceId;
  expiresAt: Date;
  ipMetadata?: Metadata;
}>;
export type SessionContext = Readonly<{
  sessionId: SessionId;
  accountId: AccountId;
  expiresAt: Date;
}>;
export type SessionSummary = Readonly<
  Pick<Session, "id" | "deviceId" | "status" | "lastActivityAt" | "expiresAt">
>;
