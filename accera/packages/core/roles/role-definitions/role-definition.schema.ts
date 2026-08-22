import { z } from 'zod';

/** Runtime input validation only; this module has no persistence access. */
export const role_definitionIdSchema = z.string().uuid();
export const createRoleDefinitionSchema = z.object({ id: role_definitionIdSchema.optional(), metadata: z.record(z.unknown()).default({}) }).strict();
export const updateRoleDefinitionSchema = z.object({ metadata: z.record(z.unknown()).optional() }).strict();
