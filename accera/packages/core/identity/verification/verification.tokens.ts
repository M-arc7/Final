/** Token port. Infrastructure supplies cryptography; token values are never persisted in plaintext. */
export interface VerificationTokenCodec { issue(input: Readonly<{ purpose: string; subjectId: string; expiresAt: Date }>): Promise<Readonly<{ token: string; tokenHash: string }>>; verify(token: string, hash: string, expiresAt: Date): Promise<boolean>; }
