import { z } from 'zod';

/** Runtime input validation only; this module has no persistence access. */
export const membership_planIdSchema = z.string().uuid();
export const createMembershipPlanSchema = z.object({ id: membership_planIdSchema.optional(), metadata: z.record(z.unknown()).default({}) }).strict();
export const updateMembershipPlanSchema = z.object({ metadata: z.record(z.unknown()).optional() }).strict();
