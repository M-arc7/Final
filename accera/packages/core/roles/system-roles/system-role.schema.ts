import { z } from 'zod';

/** Runtime input validation only; this module has no persistence access. */
export const system_roleIdSchema = z.string().uuid();
export const createSystemRoleSchema = z.object({ id: system_roleIdSchema.optional(), metadata: z.record(z.unknown()).default({}) }).strict();
export const updateSystemRoleSchema = z.object({ metadata: z.record(z.unknown()).optional() }).strict();
