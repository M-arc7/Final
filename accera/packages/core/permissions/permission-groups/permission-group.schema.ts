import { z } from "zod";
export const permissionGroupSchema = z
  .object({
    name: z.string().min(1).max(120),
    permissionCodes: z.array(z.string().regex(/^[a-z][a-z0-9_.]*$/)).max(500),
  })
  .strict();
