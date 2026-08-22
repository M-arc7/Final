import { z } from 'zod';

/** Runtime input validation only; this module has no persistence access. */
export const membership_typeIdSchema = z.string().uuid();
export const createMembershipTypeSchema = z.object({ id: membership_typeIdSchema.optional(), metadata: z.record(z.unknown()).default({}) }).strict();
export const updateMembershipTypeSchema = z.object({ metadata: z.record(z.unknown()).optional() }).strict();
