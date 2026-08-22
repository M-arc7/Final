import { z } from "zod";
export const accessPolicySchema = z
  .object({
    code: z.string().regex(/^[a-z][a-z0-9_.]*$/),
    description: z.string().min(1).max(1000),
    organisationId: z.string().uuid().optional(),
    permission: z.string().regex(/^[a-z][a-z0-9_.]*$/),
  })
  .strict();
