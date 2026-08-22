import type { AccountId } from "../account";
import type { Device, DeviceId } from "./device.types";
export interface DeviceRepository {
  create(device: Device): Promise<Device>;
  findById(id: DeviceId): Promise<Device | null>;
  update(device: Device): Promise<Device>;
  listForAccount(accountId: AccountId): Promise<readonly Device[]>;
}
