import {
  completeVerification,
  createVerification,
  expireVerification,
  recordFailedVerificationAttempt,
} from "./verification.entity";
import type { VerificationRepository } from "./verification.repository";
import type { VerificationTokenCodec } from "./verification.tokens";
import type {
  Verification,
  VerificationCreateInput,
  VerificationId,
  VerificationResult,
} from "./verification.types";

export class VerificationService {
  constructor(
    private readonly repository: VerificationRepository,
    private readonly tokens: VerificationTokenCodec,
    private readonly now: () => Date = () => new Date(),
  ) {}
  async create(
    input: VerificationCreateInput,
  ): Promise<Readonly<{ verification: Verification; token: string }>> {
    await this.repository.invalidatePending(input.accountId, input.purpose);
    const token = await this.tokens.issue();
    const verification = await this.repository.create(
      createVerification(input, token.hash, this.now()),
    );
    return { verification, token: token.token };
  }
  async complete(
    id: VerificationId,
    token: string,
  ): Promise<VerificationResult> {
    const verification = await this.repository.findById(id);
    if (
      !verification ||
      verification.status !== "pending" ||
      !verification.tokenHash
    )
      return { verified: false, status: "invalidated" };
    if (verification.expiresAt <= this.now()) {
      await this.repository.update(
        expireVerification(verification, this.now()),
      );
      return { verified: false, status: "expired" };
    }
    if (!(await this.tokens.verify(token, verification.tokenHash))) {
      const attempted = await this.repository.update(
        recordFailedVerificationAttempt(verification, this.now()),
      );
      return { verified: false, status: attempted.status };
    }
    const completed = await this.repository.completeIfPending(
      completeVerification(verification, this.now()),
    );
    return completed
      ? {
          verified: true,
          status: completed.status,
          accountId: completed.accountId,
        }
      : { verified: false, status: "invalidated" };
  }
}
