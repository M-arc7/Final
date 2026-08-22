import type { Brand, EntityStatus, Metadata, Timestamped } from '../../shared/primitives';

/** Type contracts only; runtime validation belongs in professional-profile.schema.ts. */
export type ProfessionalProfileId = Brand<string, 'ProfessionalProfileId'>;
export type ProfessionalProfileStatus = EntityStatus;
export type ProfessionalProfile = Readonly<{ id: ProfessionalProfileId; status: ProfessionalProfileStatus; metadata: Metadata } & Timestamped>;
export type CreateProfessionalProfileInput = Readonly<{ id?: ProfessionalProfileId; metadata?: Metadata }>;
export type UpdateProfessionalProfileInput = Readonly<{ metadata?: Metadata }>;
