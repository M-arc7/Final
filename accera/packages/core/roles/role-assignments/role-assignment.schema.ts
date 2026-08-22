import { z } from 'zod';

/** Runtime input validation only; this module has no persistence access. */
export const role_assignmentIdSchema = z.string().uuid();
export const createRoleAssignmentSchema = z.object({ id: role_assignmentIdSchema.optional(), metadata: z.record(z.unknown()).default({}) }).strict();
export const updateRoleAssignmentSchema = z.object({ metadata: z.record(z.unknown()).optional() }).strict();
