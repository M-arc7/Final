import { z } from 'zod';

/** Runtime input validation only; this module has no persistence access. */
export const access_auditIdSchema = z.string().uuid();
export const createAccessAuditSchema = z.object({ id: access_auditIdSchema.optional(), metadata: z.record(z.unknown()).default({}) }).strict();
export const updateAccessAuditSchema = z.object({ metadata: z.record(z.unknown()).optional() }).strict();
