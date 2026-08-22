import type { AuthenticationId } from './authentication.types';
/** External authentication adapter port. Provider SDKs and credentials stay in infrastructure. */
export interface AuthenticationProvider { authenticate(input: Readonly<Record<string, unknown>>): Promise<Readonly<{ accountId: AuthenticationId; providerSubject: string; requiresMfa: boolean }>>; revoke?(providerSubject: string): Promise<void>; }
