import { z } from 'zod';

/** Runtime input validation only; this module has no persistence access. */
export const membershipIdSchema = z.string().uuid();
export const createMembershipSchema = z.object({ id: membershipIdSchema.optional(), metadata: z.record(z.unknown()).default({}) }).strict();
export const updateMembershipSchema = z.object({ metadata: z.record(z.unknown()).optional() }).strict();
