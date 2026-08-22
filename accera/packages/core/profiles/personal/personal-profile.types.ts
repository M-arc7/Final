import type { Brand, EntityStatus, Metadata, Timestamped } from '../../shared/primitives';

/** Type contracts only; runtime validation belongs in personal-profile.schema.ts. */
export type PersonalProfileId = Brand<string, 'PersonalProfileId'>;
export type PersonalProfileStatus = EntityStatus;
export type PersonalProfile = Readonly<{ id: PersonalProfileId; status: PersonalProfileStatus; metadata: Metadata } & Timestamped>;
export type CreatePersonalProfileInput = Readonly<{ id?: PersonalProfileId; metadata?: Metadata }>;
export type UpdatePersonalProfileInput = Readonly<{ metadata?: Metadata }>;
