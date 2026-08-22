import { z } from "zod";
export const organisationRoleSchema = z
  .object({
    organisationId: z.string().uuid(),
    code: z.string().regex(/^[a-z][a-z0-9_.]*$/),
    name: z.string().min(1).max(120),
    rank: z.number().int().min(0),
    inheritsFrom: z.string().uuid().optional(),
  })
  .strict();
