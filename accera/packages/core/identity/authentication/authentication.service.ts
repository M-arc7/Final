import type { AccountService } from "../account";
import type { SessionService } from "../sessions";
import type { VerificationService } from "../verification";
import type { VerificationId } from "../verification";
import { AuthenticationError } from "./authentication.errors";
import type { AuthenticationRepository } from "./authentication.repository";
import type { IdentityProvider } from "./authentication.providers";
import type {
  AuthenticationResult,
  PasswordResetInput,
  RefreshSessionInput,
  SignInInput,
  SignOutInput,
  SignUpInput,
  VerifyIdentityInput,
} from "./authentication.types";
/** Identity orchestration only: account → verification → session. Authorization is intentionally absent. */
export class AuthenticationService {
  private readonly sessionLifetimeMs = 60 * 60_000;

  constructor(
    private readonly accounts: AccountService,
    private readonly sessions: SessionService,
    private readonly verification: VerificationService,
    private readonly events: AuthenticationRepository,
    private readonly providers: ReadonlyMap<string, IdentityProvider>,
    private readonly now: () => Date = () => new Date(),
  ) {}

  private provider(name: string): IdentityProvider {
    const provider = this.providers.get(name);
    if (!provider) throw new AuthenticationError("unsupported_provider");
    return provider;
  }

  async signUp(input: SignUpInput): Promise<AuthenticationResult> {
    let identity;
    try {
      identity = await this.provider(input.provider).signUp(input);
    } catch (error) {
      if (error instanceof AuthenticationError) throw error;
      throw new AuthenticationError("invalid_credentials");
    }
    let account;
    try {
      account = await this.accounts.create({
        identity: {
          provider: identity.provider,
          providerSubject: identity.providerSubject,
        },
      });
    } catch {
      throw new AuthenticationError("invalid_credentials");
    }
    if (identity.verified) account = await this.accounts.activate(account.id);
    await this.events.recordEvent({
      accountId: account.id,
      provider: input.provider,
      type: "sign_up",
      occurredAt: this.now(),
    });
    if (!identity.verified)
      await this.verification.create({
        accountId: account.id,
        purpose: "identity",
        channel: input.provider,
        expiresAt: new Date(this.now().getTime() + 15 * 60_000),
      });
    return {
      accountId: account.id,
      verificationRequired: !identity.verified,
      mfaRequired: false,
    };
  }

  async verifyIdentity(
    input: VerifyIdentityInput,
  ): Promise<AuthenticationResult> {
    const result = await this.verification.complete(
      input.verificationId as VerificationId,
      input.token,
    );
    if (!result.verified || !result.accountId)
      throw new AuthenticationError("verification_required");
    const account = await this.accounts.get(result.accountId);
    if (!account || account.status === "locked")
      throw new AuthenticationError("verification_required");
    if (account.status === "pending") await this.accounts.activate(account.id);
    return {
      accountId: account.id,
      verificationRequired: false,
      mfaRequired: false,
    };
  }

  async signIn(input: SignInInput): Promise<AuthenticationResult> {
    let identity;
    try {
      identity = await this.provider(input.provider).signIn(input);
    } catch (error) {
      if (error instanceof AuthenticationError) throw error;
      throw new AuthenticationError("invalid_credentials");
    }
    const account = await this.accounts.getByIdentity({
      provider: identity.provider,
      providerSubject: identity.providerSubject,
    });
    if (!account) throw new AuthenticationError("invalid_credentials");
    if (account.status === "locked")
      throw new AuthenticationError("account_locked");
    if (account.status === "suspended" || account.status === "deactivated")
      throw new AuthenticationError("account_suspended");
    if (account.status !== "active" || !identity.verified)
      return {
        accountId: account.id,
        verificationRequired: true,
        mfaRequired: false,
      };
    const session = await this.sessions.create({
      accountId: account.id,
      deviceId: input.deviceId,
      expiresAt: new Date(this.now().getTime() + this.sessionLifetimeMs),
    });
    await this.events.recordEvent({
      accountId: account.id,
      provider: input.provider,
      type: "sign_in",
      occurredAt: this.now(),
    });
    return {
      accountId: account.id,
      sessionId: session.id,
      verificationRequired: false,
      mfaRequired: false,
    };
  }

  async signOut(input: SignOutInput): Promise<void> {
    await this.sessions.revoke(input.sessionId);
  }

  async refreshSession(
    input: RefreshSessionInput,
  ): Promise<AuthenticationResult> {
    const session = await this.sessions.refresh(
      input.sessionId,
      new Date(this.now().getTime() + this.sessionLifetimeMs),
    );
    return {
      accountId: session.accountId,
      sessionId: session.id,
      verificationRequired: false,
      mfaRequired: false,
    };
  }

  async requestPasswordReset(
    input: Pick<PasswordResetInput, "provider" | "identifier">,
  ): Promise<void> {
    try {
      await this.provider(input.provider).requestPasswordReset?.(
        input.identifier,
      );
    } catch {
      // Preserve an enumeration-safe response whether or not this identity exists.
    }
    await this.events.recordEvent({
      provider: input.provider,
      type: "reset_requested",
      occurredAt: this.now(),
    });
  }

  async resetPassword(input: Required<PasswordResetInput>): Promise<void> {
    try {
      await this.provider(input.provider).resetPassword?.({
        token: input.resetToken,
        newSecret: input.newSecret,
      });
    } catch {
      throw new AuthenticationError("invalid_credentials");
    }
    await this.events.recordEvent({
      provider: input.provider,
      type: "reset_completed",
      occurredAt: this.now(),
    });
  }
}
