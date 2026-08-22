import type { Repository } from '../../shared/repository';
import type { UserSetting, UserSettingId } from './user-setting.types';

/** Persistence port only. Database queries and adapter details live outside core. */
export interface UserSettingRepository extends Repository<UserSettingId, UserSetting> {}
