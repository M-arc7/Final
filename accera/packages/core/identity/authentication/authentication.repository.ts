import type { AccountId } from "../account";
import type { ProviderIdentity } from "./authentication.providers";
import type { AuthenticationProvider } from "./authentication.types";
/** Persistence port for metadata/events only. Passwords and raw provider secrets are never application records. */
export interface AuthenticationRepository {
  recordEvent(
    event: Readonly<{
      accountId?: AccountId;
      provider: AuthenticationProvider;
      type:
        | "sign_up"
        | "sign_in"
        | "sign_out"
        | "reset_requested"
        | "reset_completed";
      occurredAt: Date;
    }>,
  ): Promise<void>;
  findProviderIdentity(
    provider: AuthenticationProvider,
    providerSubject: string,
  ): Promise<ProviderIdentity | null>;
}
