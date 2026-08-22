import type { Brand, EntityStatus, Metadata, Timestamped } from '../../shared/primitives';

/** Type contracts only; runtime validation belongs in access-audit.schema.ts. */
export type AccessAuditId = Brand<string, 'AccessAuditId'>;
export type AccessAuditStatus = EntityStatus;
export type AccessAudit = Readonly<{ id: AccessAuditId; status: AccessAuditStatus; metadata: Metadata } & Timestamped>;
export type CreateAccessAuditInput = Readonly<{ id?: AccessAuditId; metadata?: Metadata }>;
export type UpdateAccessAuditInput = Readonly<{ metadata?: Metadata }>;
