import { CoreError } from "../../shared/errors";
export type AuthenticationErrorCode =
  | "invalid_credentials"
  | "account_not_found"
  | "account_locked"
  | "account_suspended"
  | "verification_required"
  | "session_expired"
  | "unsupported_provider"
  | "rate_limited";
export class AuthenticationError extends CoreError {
  constructor(
    code: AuthenticationErrorCode,
    context: Readonly<Record<string, unknown>> = {},
  ) {
    super(code, "Authentication could not be completed.", context);
  }
}
