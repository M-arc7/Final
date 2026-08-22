import type { Repository } from '../../shared/repository';
import type { PlatformSetting, PlatformSettingId } from './platform-setting.types';

/** Persistence port only. Database queries and adapter details live outside core. */
export interface PlatformSettingRepository extends Repository<PlatformSettingId, PlatformSetting> {}
