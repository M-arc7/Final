import type {
  AuthenticationProvider,
  SignInInput,
  SignUpInput,
} from "./authentication.types";
/** Provider port only. Provider implementations live in infrastructure and must not return plaintext secrets. */
export type ProviderIdentity = Readonly<{
  provider: AuthenticationProvider;
  providerSubject: string;
  identifier: string;
  verified: boolean;
}>;
export interface IdentityProvider {
  readonly name: AuthenticationProvider;
  signUp(input: SignUpInput): Promise<ProviderIdentity>;
  signIn(input: SignInInput): Promise<ProviderIdentity>;
  signOut?(providerSubject: string): Promise<void>;
  requestPasswordReset?(identifier: string): Promise<void>;
  resetPassword?(
    input: Readonly<{ token: string; newSecret: string }>,
  ): Promise<void>;
}
