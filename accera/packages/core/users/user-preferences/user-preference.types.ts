import type { Brand, EntityStatus, Metadata, Timestamped } from '../../shared/primitives';

/** Type contracts only; runtime validation belongs in user-preference.schema.ts. */
export type UserPreferenceId = Brand<string, 'UserPreferenceId'>;
export type UserPreferenceStatus = EntityStatus;
export type UserPreference = Readonly<{ id: UserPreferenceId; status: UserPreferenceStatus; metadata: Metadata } & Timestamped>;
export type CreateUserPreferenceInput = Readonly<{ id?: UserPreferenceId; metadata?: Metadata }>;
export type UpdateUserPreferenceInput = Readonly<{ metadata?: Metadata }>;
