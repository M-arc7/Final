import { z } from 'zod';

/** Runtime input validation only; this module has no persistence access. */
export const deviceIdSchema = z.string().uuid();
export const createDeviceSchema = z.object({ id: deviceIdSchema.optional(), metadata: z.record(z.unknown()).default({}) }).strict();
export const updateDeviceSchema = z.object({ metadata: z.record(z.unknown()).optional() }).strict();
