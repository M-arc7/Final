import type { Brand, Timestamped } from "../../shared/primitives";
export type SystemRoleId = Brand<string, "SystemRoleId">;
export type SystemRoleCode =
  | "platform_admin"
  | "platform_support"
  | "platform_finance"
  | "platform_moderator"
  | (string & {});
export type SystemRole = Readonly<
  {
    id: SystemRoleId;
    code: SystemRoleCode;
    name: string;
    status: "active" | "inactive";
    privileged: boolean;
  } & Timestamped
>;
