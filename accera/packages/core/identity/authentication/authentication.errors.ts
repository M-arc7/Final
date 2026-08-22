import { CoreError } from '../../shared/errors';
export type AuthenticationErrorCode = 'invalid_credentials' | 'provider_failure' | 'account_locked' | 'mfa_required' | 'verification_required' | 'authentication_expired';
export class AuthenticationError extends CoreError { constructor(code: AuthenticationErrorCode, message: string, context: Readonly<Record<string, unknown>> = {}) { super(code, message, context); } }
