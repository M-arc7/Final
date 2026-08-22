import { z } from 'zod';

/** Runtime input validation only; this module has no persistence access. */
export const permission_groupIdSchema = z.string().uuid();
export const createPermissionGroupSchema = z.object({ id: permission_groupIdSchema.optional(), metadata: z.record(z.unknown()).default({}) }).strict();
export const updatePermissionGroupSchema = z.object({ metadata: z.record(z.unknown()).optional() }).strict();
