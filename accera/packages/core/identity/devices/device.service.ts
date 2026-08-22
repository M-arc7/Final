import { CoreError } from '../../shared/errors';
import { createDevice, transitionDeviceStatus } from './device.entity';
import type { DeviceRepository } from './device.repository';
import type { CreateDeviceInput, Device, DeviceId, DeviceStatus } from './device.types';

/** Use-case orchestration only. UI, HTTP and provider SDK concerns are forbidden here. */
export class DeviceService {
  constructor(private readonly repository: DeviceRepository, private readonly now: () => Date = () => new Date()) {}
  async get(id: DeviceId): Promise<Device | null> { return this.repository.findById(id); }
  async create(input: CreateDeviceInput): Promise<Device> { return this.repository.insert(createDevice(input, this.now())); }
  async changeStatus(id: DeviceId, status: DeviceStatus): Promise<Device> { const record = await this.repository.findById(id); if (!record) throw new CoreError('device.not_found', 'The requested record does not exist.', { id }); return this.repository.replace(transitionDeviceStatus(record, status, this.now())); }
}
