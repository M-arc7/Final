import { z } from "zod";
export const sessionIdSchema = z.string().uuid();
export const createSessionSchema = z
  .object({
    accountId: z.string().uuid(),
    deviceId: z.string().uuid().optional(),
    expiresAt: z.coerce.date(),
    ipMetadata: z.record(z.unknown()).optional(),
  })
  .strict();
export const revokeSessionSchema = z
  .object({ sessionId: sessionIdSchema })
  .strict();
