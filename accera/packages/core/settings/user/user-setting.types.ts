import type { Brand, EntityStatus, Metadata, Timestamped } from '../../shared/primitives';

/** Type contracts only; runtime validation belongs in user-setting.schema.ts. */
export type UserSettingId = Brand<string, 'UserSettingId'>;
export type UserSettingStatus = EntityStatus;
export type UserSetting = Readonly<{ id: UserSettingId; status: UserSettingStatus; metadata: Metadata } & Timestamped>;
export type CreateUserSettingInput = Readonly<{ id?: UserSettingId; metadata?: Metadata }>;
export type UpdateUserSettingInput = Readonly<{ metadata?: Metadata }>;
