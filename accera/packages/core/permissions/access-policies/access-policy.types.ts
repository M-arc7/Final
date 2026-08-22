import type { Brand, EntityStatus, Metadata, Timestamped } from '../../shared/primitives';

/** Type contracts only; runtime validation belongs in access-policy.schema.ts. */
export type AccessPolicyId = Brand<string, 'AccessPolicyId'>;
export type AccessPolicyStatus = EntityStatus;
export type AccessPolicy = Readonly<{ id: AccessPolicyId; status: AccessPolicyStatus; metadata: Metadata } & Timestamped>;
export type CreateAccessPolicyInput = Readonly<{ id?: AccessPolicyId; metadata?: Metadata }>;
export type UpdateAccessPolicyInput = Readonly<{ metadata?: Metadata }>;
