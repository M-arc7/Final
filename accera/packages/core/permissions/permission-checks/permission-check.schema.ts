import { z } from 'zod';

/** Runtime input validation only; this module has no persistence access. */
export const permission_checkIdSchema = z.string().uuid();
export const createPermissionCheckSchema = z.object({ id: permission_checkIdSchema.optional(), metadata: z.record(z.unknown()).default({}) }).strict();
export const updatePermissionCheckSchema = z.object({ metadata: z.record(z.unknown()).optional() }).strict();
