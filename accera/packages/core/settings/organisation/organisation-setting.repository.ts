import type { Repository } from '../../shared/repository';
import type { OrganisationSetting, OrganisationSettingId } from './organisation-setting.types';

/** Persistence port only. Database queries and adapter details live outside core. */
export interface OrganisationSettingRepository extends Repository<OrganisationSettingId, OrganisationSetting> {}
