import { z } from 'zod';

/** Runtime input validation only; this module has no persistence access. */
export const file_permissionIdSchema = z.string().uuid();
export const createFilePermissionSchema = z.object({ id: file_permissionIdSchema.optional(), metadata: z.record(z.unknown()).default({}) }).strict();
export const updateFilePermissionSchema = z.object({ metadata: z.record(z.unknown()).optional() }).strict();
