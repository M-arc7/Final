import type { Brand, EntityStatus, Metadata, Timestamped } from '../../shared/primitives';

/** Type contracts only; runtime validation belongs in audit-event.schema.ts. */
export type AuditEventId = Brand<string, 'AuditEventId'>;
export type AuditEventStatus = EntityStatus;
export type AuditEvent = Readonly<{ id: AuditEventId; status: AuditEventStatus; metadata: Metadata } & Timestamped>;
export type CreateAuditEventInput = Readonly<{ id?: AuditEventId; metadata?: Metadata }>;
export type UpdateAuditEventInput = Readonly<{ metadata?: Metadata }>;
