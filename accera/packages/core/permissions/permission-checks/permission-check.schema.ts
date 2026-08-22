import { z } from "zod";
export const permissionCheckSchema = z
  .object({
    actorAccountId: z.string().uuid().optional(),
    permission: z.string().regex(/^[a-z][a-z0-9_.]*$/),
    organisationId: z.string().uuid().optional(),
    resource: z
      .object({
        type: z.string().min(1).max(120),
        id: z.string().uuid().optional(),
        ownerAccountId: z.string().uuid().optional(),
      })
      .strict(),
    context: z.record(z.unknown()).optional(),
  })
  .strict();
