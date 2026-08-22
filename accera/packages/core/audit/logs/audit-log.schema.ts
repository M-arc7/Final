import { z } from 'zod';

/** Runtime input validation only; this module has no persistence access. */
export const audit_logIdSchema = z.string().uuid();
export const createAuditLogSchema = z.object({ id: audit_logIdSchema.optional(), metadata: z.record(z.unknown()).default({}) }).strict();
export const updateAuditLogSchema = z.object({ metadata: z.record(z.unknown()).optional() }).strict();
