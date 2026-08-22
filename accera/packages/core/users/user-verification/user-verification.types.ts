import type { Brand, EntityStatus, Metadata, Timestamped } from '../../shared/primitives';

/** Type contracts only; runtime validation belongs in user-verification.schema.ts. */
export type UserVerificationId = Brand<string, 'UserVerificationId'>;
export type UserVerificationStatus = EntityStatus;
export type UserVerification = Readonly<{ id: UserVerificationId; status: UserVerificationStatus; metadata: Metadata } & Timestamped>;
export type CreateUserVerificationInput = Readonly<{ id?: UserVerificationId; metadata?: Metadata }>;
export type UpdateUserVerificationInput = Readonly<{ metadata?: Metadata }>;
