import type { Brand, EntityStatus, Metadata, Timestamped } from '../../shared/primitives';

/** Type contracts only; runtime validation belongs in verification.schema.ts. */
export type VerificationId = Brand<string, 'VerificationId'>;
export type VerificationStatus = EntityStatus;
export type Verification = Readonly<{ id: VerificationId; status: VerificationStatus; metadata: Metadata } & Timestamped>;
export type CreateVerificationInput = Readonly<{ id?: VerificationId; metadata?: Metadata }>;
export type UpdateVerificationInput = Readonly<{ metadata?: Metadata }>;
