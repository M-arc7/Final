import { z } from "zod";
export const permissionSchema = z
  .object({
    code: z.string().regex(/^[a-z][a-z0-9_.]*$/),
    description: z.string().min(1).max(500),
  })
  .strict();
