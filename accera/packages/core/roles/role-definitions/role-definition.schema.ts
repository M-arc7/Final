import { z } from "zod";
export const roleDefinitionSchema = z
  .object({
    code: z.string().regex(/^[a-z][a-z0-9_.]*$/),
    name: z.string().min(1).max(120),
    scope: z.enum([
      "platform",
      "organisation",
      "facility",
      "academy",
      "competition",
    ]),
    description: z.string().max(2000).optional(),
    permissionCodes: z.array(z.string().regex(/^[a-z][a-z0-9_.]*$/)).max(500),
  })
  .strict();
