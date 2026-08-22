import { invariant } from "../../shared/errors";
import { newId } from "../../shared/primitives";
import type {
  Verification,
  VerificationCreateInput,
} from "./verification.types";

const defaultMaxAttempts = 5;
export const createVerification = (
  input: VerificationCreateInput,
  tokenHash: string,
  now = new Date(),
): Verification => {
  const maxAttempts = input.maxAttempts ?? defaultMaxAttempts;
  invariant(
    input.expiresAt > now,
    "verification.invalid_expiry",
    "Verification expiry must be in the future.",
  );
  invariant(
    Number.isInteger(maxAttempts) && maxAttempts > 0 && maxAttempts <= 10,
    "verification.invalid_attempt_limit",
    "Verification attempt limit is invalid.",
  );
  return {
    id: newId<"VerificationId">(),
    accountId: input.accountId,
    purpose: input.purpose,
    channel: input.channel,
    status: "pending",
    tokenHash,
    attemptCount: 0,
    maxAttempts,
    expiresAt: input.expiresAt,
    createdAt: now,
    updatedAt: now,
  };
};
export const expireVerification = (
  verification: Verification,
  now = new Date(),
): Verification => ({
  ...verification,
  status: "expired",
  tokenHash: undefined,
  updatedAt: now,
});
export const recordFailedVerificationAttempt = (
  verification: Verification,
  now = new Date(),
): Verification => {
  const attemptCount = verification.attemptCount + 1;
  return {
    ...verification,
    attemptCount,
    status:
      attemptCount >= verification.maxAttempts ? "invalidated" : "pending",
    tokenHash:
      attemptCount >= verification.maxAttempts
        ? undefined
        : verification.tokenHash,
    updatedAt: now,
  };
};
export const completeVerification = (
  verification: Verification,
  now = new Date(),
): Verification => ({
  ...verification,
  status: "completed",
  tokenHash: undefined,
  completedAt: now,
  updatedAt: now,
});
