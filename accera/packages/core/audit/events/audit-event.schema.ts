import { z } from 'zod';

/** Runtime input validation only; this module has no persistence access. */
export const audit_eventIdSchema = z.string().uuid();
export const createAuditEventSchema = z.object({ id: audit_eventIdSchema.optional(), metadata: z.record(z.unknown()).default({}) }).strict();
export const updateAuditEventSchema = z.object({ metadata: z.record(z.unknown()).optional() }).strict();
