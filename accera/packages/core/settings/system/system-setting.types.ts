import type { Brand, EntityStatus, Metadata, Timestamped } from '../../shared/primitives';

/** Type contracts only; runtime validation belongs in system-setting.schema.ts. */
export type SystemSettingId = Brand<string, 'SystemSettingId'>;
export type SystemSettingStatus = EntityStatus;
export type SystemSetting = Readonly<{ id: SystemSettingId; status: SystemSettingStatus; metadata: Metadata } & Timestamped>;
export type CreateSystemSettingInput = Readonly<{ id?: SystemSettingId; metadata?: Metadata }>;
export type UpdateSystemSettingInput = Readonly<{ metadata?: Metadata }>;
