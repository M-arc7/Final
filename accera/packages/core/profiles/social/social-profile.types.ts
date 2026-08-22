import type { Brand, EntityStatus, Metadata, Timestamped } from '../../shared/primitives';

/** Type contracts only; runtime validation belongs in social-profile.schema.ts. */
export type SocialProfileId = Brand<string, 'SocialProfileId'>;
export type SocialProfileStatus = EntityStatus;
export type SocialProfile = Readonly<{ id: SocialProfileId; status: SocialProfileStatus; metadata: Metadata } & Timestamped>;
export type CreateSocialProfileInput = Readonly<{ id?: SocialProfileId; metadata?: Metadata }>;
export type UpdateSocialProfileInput = Readonly<{ metadata?: Metadata }>;
