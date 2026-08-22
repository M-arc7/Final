import { z } from "zod";
export const accountIdSchema = z.string().uuid();
export const accountStatusSchema = z.enum([
  "pending",
  "active",
  "suspended",
  "locked",
  "deactivated",
]);
export const accountIdentitySchema = z
  .object({
    provider: z.string().min(1).max(80),
    providerSubject: z.string().min(1).max(255),
  })
  .strict();
export const createAccountSchema = z
  .object({
    id: accountIdSchema.optional(),
    identity: accountIdentitySchema,
    metadata: z.record(z.unknown()).default({}),
  })
  .strict();
export const updateAccountSchema = z
  .object({ metadata: z.record(z.unknown()).optional() })
  .strict();
export const accountStatusTransitionSchema = z
  .object({ status: accountStatusSchema })
  .strict();
