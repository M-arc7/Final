import { z } from "zod";
export const registerDeviceSchema = z
  .object({
    accountId: z.string().uuid(),
    type: z.enum(["mobile", "desktop", "browser", "other"]),
    platform: z.enum(["ios", "android", "web", "other"]),
    name: z.string().trim().min(1).max(120).optional(),
    osVersion: z.string().max(80).optional(),
    appVersion: z.string().max(80).optional(),
    pushToken: z.string().max(4096).optional(),
    metadata: z.record(z.unknown()).optional(),
  })
  .strict();
