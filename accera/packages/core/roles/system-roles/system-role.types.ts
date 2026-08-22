import type { Brand, EntityStatus, Metadata, Timestamped } from '../../shared/primitives';

/** Type contracts only; runtime validation belongs in system-role.schema.ts. */
export type SystemRoleId = Brand<string, 'SystemRoleId'>;
export type SystemRoleStatus = EntityStatus;
export type SystemRole = Readonly<{ id: SystemRoleId; status: SystemRoleStatus; metadata: Metadata } & Timestamped>;
export type CreateSystemRoleInput = Readonly<{ id?: SystemRoleId; metadata?: Metadata }>;
export type UpdateSystemRoleInput = Readonly<{ metadata?: Metadata }>;
