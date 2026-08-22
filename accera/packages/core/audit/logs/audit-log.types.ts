import type { Brand, EntityStatus, Metadata, Timestamped } from '../../shared/primitives';

/** Type contracts only; runtime validation belongs in audit-log.schema.ts. */
export type AuditLogId = Brand<string, 'AuditLogId'>;
export type AuditLogStatus = EntityStatus;
export type AuditLog = Readonly<{ id: AuditLogId; status: AuditLogStatus; metadata: Metadata } & Timestamped>;
export type CreateAuditLogInput = Readonly<{ id?: AuditLogId; metadata?: Metadata }>;
export type UpdateAuditLogInput = Readonly<{ metadata?: Metadata }>;
