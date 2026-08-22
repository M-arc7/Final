import type { AccountId } from "../account";
import type { Brand, Timestamped } from "../../shared/primitives";

export type VerificationId = Brand<string, "VerificationId">;
export type VerificationPurpose =
  | "identity"
  | "email"
  | "phone"
  | "password_reset"
  | "mfa";
export type VerificationStatus =
  | "pending"
  | "completed"
  | "expired"
  | "invalidated";
export type Verification = Readonly<
  {
    id: VerificationId;
    accountId: AccountId;
    purpose: VerificationPurpose;
    channel: string;
    status: VerificationStatus;
    tokenHash?: string;
    attemptCount: number;
    maxAttempts: number;
    expiresAt: Date;
    completedAt?: Date;
  } & Timestamped
>;
export type VerificationCreateInput = Readonly<{
  accountId: AccountId;
  purpose: VerificationPurpose;
  channel: string;
  expiresAt: Date;
  maxAttempts?: number;
}>;
export type VerificationResult = Readonly<{
  verified: boolean;
  status: VerificationStatus;
  accountId?: AccountId;
}>;
