import { newId } from "../../shared/primitives";
import type { Device, DeviceRegisterInput } from "./device.types";

/** Device facts are intentionally limited to user-provided application metadata. */
export const registerDevice = (
  input: DeviceRegisterInput,
  now = new Date(),
): Device => ({
  id: newId<"DeviceId">(),
  accountId: input.accountId,
  type: input.type,
  platform: input.platform,
  name: input.name,
  osVersion: input.osVersion,
  appVersion: input.appVersion,
  pushToken: input.pushToken,
  trust: "untrusted",
  status: "active",
  lastSeenAt: now,
  metadata: input.metadata ?? {},
  createdAt: now,
  updatedAt: now,
});
export const markDeviceSeen = (device: Device, now = new Date()): Device => ({
  ...device,
  lastSeenAt: now,
  updatedAt: now,
});
export const setDeviceTrust = (
  device: Device,
  trusted: boolean,
  now = new Date(),
): Device => ({
  ...device,
  trust: trusted ? "trusted" : "untrusted",
  updatedAt: now,
});
export const revokeDevice = (device: Device, now = new Date()): Device => ({
  ...device,
  status: "revoked",
  trust: "revoked",
  pushToken: undefined,
  updatedAt: now,
});
