import type { Brand, EntityStatus, Metadata, Timestamped } from '../../shared/primitives';

/** Type contracts only; runtime validation belongs in platform-setting.schema.ts. */
export type PlatformSettingId = Brand<string, 'PlatformSettingId'>;
export type PlatformSettingStatus = EntityStatus;
export type PlatformSetting = Readonly<{ id: PlatformSettingId; status: PlatformSettingStatus; metadata: Metadata } & Timestamped>;
export type CreatePlatformSettingInput = Readonly<{ id?: PlatformSettingId; metadata?: Metadata }>;
export type UpdatePlatformSettingInput = Readonly<{ metadata?: Metadata }>;
