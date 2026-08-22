import type { AccountId } from "../account";
import type { Brand, Metadata, Timestamped } from "../../shared/primitives";

export type DeviceId = Brand<string, "DeviceId">;
export type DeviceType = "mobile" | "desktop" | "browser" | "other";
export type DevicePlatform = "ios" | "android" | "web" | "other";
export type DeviceStatus = "active" | "revoked";
export type DeviceTrust = "untrusted" | "trusted" | "revoked";
export type Device = Readonly<
  {
    id: DeviceId;
    accountId: AccountId;
    type: DeviceType;
    platform: DevicePlatform;
    name?: string;
    osVersion?: string;
    appVersion?: string;
    pushToken?: string;
    trust: DeviceTrust;
    status: DeviceStatus;
    lastSeenAt: Date;
    metadata: Metadata;
  } & Timestamped
>;
export type DeviceRegisterInput = Readonly<{
  accountId: AccountId;
  type: DeviceType;
  platform: DevicePlatform;
  name?: string;
  osVersion?: string;
  appVersion?: string;
  pushToken?: string;
  metadata?: Metadata;
}>;
