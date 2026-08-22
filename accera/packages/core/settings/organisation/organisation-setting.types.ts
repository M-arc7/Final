import type { Brand, EntityStatus, Metadata, Timestamped } from '../../shared/primitives';

/** Type contracts only; runtime validation belongs in organisation-setting.schema.ts. */
export type OrganisationSettingId = Brand<string, 'OrganisationSettingId'>;
export type OrganisationSettingStatus = EntityStatus;
export type OrganisationSetting = Readonly<{ id: OrganisationSettingId; status: OrganisationSettingStatus; metadata: Metadata } & Timestamped>;
export type CreateOrganisationSettingInput = Readonly<{ id?: OrganisationSettingId; metadata?: Metadata }>;
export type UpdateOrganisationSettingInput = Readonly<{ metadata?: Metadata }>;
