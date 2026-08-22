import type { AccountId } from "../account";
import type { DeviceId } from "../devices";
import type { SessionId } from "../sessions";
import type { Brand } from "../../shared/primitives";
export type AuthenticationMethod = "password" | "otp" | "oauth";
export type AuthenticationProvider =
  | "email"
  | "phone"
  | "google"
  | "apple"
  | (string & {});
export type AuthenticationSessionToken = Brand<
  string,
  "AuthenticationSessionToken"
>;
export type SignUpInput = Readonly<{
  provider: AuthenticationProvider;
  identifier: string;
  secret?: string;
}>;
export type SignInInput = Readonly<{
  provider: AuthenticationProvider;
  identifier: string;
  secret?: string;
  verificationCode?: string;
  deviceId?: DeviceId;
}>;
export type SignOutInput = Readonly<{ sessionId: SessionId }>;
export type VerifyIdentityInput = Readonly<{
  verificationId: string;
  token: string;
}>;
export type RefreshSessionInput = Readonly<{ sessionId: SessionId }>;
export type PasswordResetInput = Readonly<{
  provider: AuthenticationProvider;
  identifier: string;
  resetToken?: string;
  newSecret?: string;
}>;
export type AuthenticationResult = Readonly<{
  accountId: AccountId;
  sessionId?: string;
  verificationRequired: boolean;
  mfaRequired: boolean;
}>;
export type AuthenticationContext = Readonly<{
  accountId: AccountId;
  sessionId: string;
  authenticatedAt: Date;
}>;
