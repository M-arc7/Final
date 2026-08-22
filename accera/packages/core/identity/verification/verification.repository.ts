import type { AccountId } from "../account";
import type { Verification, VerificationId } from "./verification.types";
export interface VerificationRepository {
  create(verification: Verification): Promise<Verification>;
  findById(id: VerificationId): Promise<Verification | null>;
  update(verification: Verification): Promise<Verification>;
  completeIfPending(verification: Verification): Promise<Verification | null>;
  invalidatePending(
    accountId: AccountId,
    purpose: Verification["purpose"],
  ): Promise<void>;
}
