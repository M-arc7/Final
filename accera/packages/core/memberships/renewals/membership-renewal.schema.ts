import { z } from 'zod';

/** Runtime input validation only; this module has no persistence access. */
export const membership_renewalIdSchema = z.string().uuid();
export const createMembershipRenewalSchema = z.object({ id: membership_renewalIdSchema.optional(), metadata: z.record(z.unknown()).default({}) }).strict();
export const updateMembershipRenewalSchema = z.object({ metadata: z.record(z.unknown()).optional() }).strict();
