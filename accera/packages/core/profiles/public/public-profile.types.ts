import type { Brand, EntityStatus, Metadata, Timestamped } from '../../shared/primitives';

/** Type contracts only; runtime validation belongs in public-profile.schema.ts. */
export type PublicProfileId = Brand<string, 'PublicProfileId'>;
export type PublicProfileStatus = EntityStatus;
export type PublicProfile = Readonly<{ id: PublicProfileId; status: PublicProfileStatus; metadata: Metadata } & Timestamped>;
export type CreatePublicProfileInput = Readonly<{ id?: PublicProfileId; metadata?: Metadata }>;
export type UpdatePublicProfileInput = Readonly<{ metadata?: Metadata }>;
