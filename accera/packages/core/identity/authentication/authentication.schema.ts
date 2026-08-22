import { z } from 'zod';

/** Runtime input validation only; this module has no persistence access. */
export const authenticationIdSchema = z.string().uuid();
export const createAuthenticationSchema = z.object({ id: authenticationIdSchema.optional(), metadata: z.record(z.unknown()).default({}) }).strict();
export const updateAuthenticationSchema = z.object({ metadata: z.record(z.unknown()).optional() }).strict();
