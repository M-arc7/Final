/**
 * Cryptographic port. Implementations must use a cryptographically secure RNG,
 * hash tokens before persistence, and compare hashes in constant time. Raw tokens
 * are returned only for delivery and must never be written to ACCERA records.
 */
export interface VerificationTokenCodec {
  issue(): Promise<Readonly<{ token: string; hash: string }>>;
  verify(token: string, hash: string): Promise<boolean>;
}
