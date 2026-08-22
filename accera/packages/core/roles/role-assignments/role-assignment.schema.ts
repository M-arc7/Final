import { z } from "zod";
export const roleAssignmentSchema = z
  .object({
    accountId: z.string().uuid(),
    roleDefinitionId: z.string().uuid(),
    scope: z
      .object({
        type: z.enum([
          "platform",
          "organisation",
          "facility",
          "academy",
          "competition",
        ]),
        organisationId: z.string().uuid().optional(),
        resourceId: z.string().uuid().optional(),
      })
      .strict(),
    startsAt: z.coerce.date(),
    endsAt: z.coerce.date().optional(),
  })
  .strict();
