import { z } from 'zod';

/** Runtime input validation only; this module has no persistence access. */
export const permissionIdSchema = z.string().uuid();
export const createPermissionSchema = z.object({ id: permissionIdSchema.optional(), metadata: z.record(z.unknown()).default({}) }).strict();
export const updatePermissionSchema = z.object({ metadata: z.record(z.unknown()).optional() }).strict();
