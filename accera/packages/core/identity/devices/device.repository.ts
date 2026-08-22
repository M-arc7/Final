import type { Repository } from '../../shared/repository';
import type { Device, DeviceId } from './device.types';

/** Persistence port only. Database queries and adapter details live outside core. */
export interface DeviceRepository extends Repository<DeviceId, Device> {}
