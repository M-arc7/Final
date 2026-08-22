import { z } from "zod";
export const systemRoleSchema = z
  .object({
    code: z.string().regex(/^[a-z][a-z0-9_]*$/),
    name: z.string().trim().min(1).max(120),
    privileged: z.boolean(),
  })
  .strict();
