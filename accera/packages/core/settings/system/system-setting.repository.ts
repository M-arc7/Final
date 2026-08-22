import type { Repository } from '../../shared/repository';
import type { SystemSetting, SystemSettingId } from './system-setting.types';

/** Persistence port only. Database queries and adapter details live outside core. */
export interface SystemSettingRepository extends Repository<SystemSettingId, SystemSetting> {}
