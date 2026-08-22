import type { Brand, EntityStatus, Metadata, Timestamped } from '../../shared/primitives';

/** Type contracts only; runtime validation belongs in entitlement.schema.ts. */
export type EntitlementId = Brand<string, 'EntitlementId'>;
export type EntitlementStatus = EntityStatus;
export type Entitlement = Readonly<{ id: EntitlementId; status: EntitlementStatus; metadata: Metadata } & Timestamped>;
export type CreateEntitlementInput = Readonly<{ id?: EntitlementId; metadata?: Metadata }>;
export type UpdateEntitlementInput = Readonly<{ metadata?: Metadata }>;
