import { z } from 'zod';

/** Runtime input validation only; this module has no persistence access. */
export const file_folderIdSchema = z.string().uuid();
export const createFileFolderSchema = z.object({ id: file_folderIdSchema.optional(), metadata: z.record(z.unknown()).default({}) }).strict();
export const updateFileFolderSchema = z.object({ metadata: z.record(z.unknown()).optional() }).strict();
