import {
  markDeviceSeen,
  registerDevice,
  revokeDevice,
  setDeviceTrust,
} from "./device.entity";
import type { DeviceRepository } from "./device.repository";
import type { Device, DeviceId, DeviceRegisterInput } from "./device.types";

export class DeviceService {
  constructor(
    private readonly repository: DeviceRepository,
    private readonly now: () => Date = () => new Date(),
  ) {}
  async register(input: DeviceRegisterInput): Promise<Device> {
    return this.repository.create(registerDevice(input, this.now()));
  }
  async revoke(id: DeviceId): Promise<void> {
    const device = await this.repository.findById(id);
    if (device) await this.repository.update(revokeDevice(device, this.now()));
  }
  async setTrusted(id: DeviceId, trusted: boolean): Promise<Device | null> {
    const device = await this.repository.findById(id);
    return device && device.status === "active"
      ? this.repository.update(setDeviceTrust(device, trusted, this.now()))
      : null;
  }
  async markSeen(id: DeviceId): Promise<Device | null> {
    const device = await this.repository.findById(id);
    return device && device.status === "active"
      ? this.repository.update(markDeviceSeen(device, this.now()))
      : null;
  }
  async updatePushToken(
    id: DeviceId,
    pushToken?: string,
  ): Promise<Device | null> {
    const device = await this.repository.findById(id);
    return device && device.status === "active"
      ? this.repository.update({ ...device, pushToken, updatedAt: this.now() })
      : null;
  }
}
