import type { Brand, EntityStatus, Metadata, Timestamped } from '../../shared/primitives';

/** Type contracts only; runtime validation belongs in device.schema.ts. */
export type DeviceId = Brand<string, 'DeviceId'>;
export type DeviceStatus = EntityStatus;
export type Device = Readonly<{ id: DeviceId; status: DeviceStatus; metadata: Metadata } & Timestamped>;
export type CreateDeviceInput = Readonly<{ id?: DeviceId; metadata?: Metadata }>;
export type UpdateDeviceInput = Readonly<{ metadata?: Metadata }>;
