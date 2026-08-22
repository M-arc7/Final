import type { Brand, Timestamped } from "../../shared/primitives";
export type AccessPolicyId = Brand<string, "AccessPolicyId">;
export type AccessPolicy = Readonly<
  {
    id: AccessPolicyId;
    code: string;
    description: string;
    enabled: boolean;
    organisationId?: string;
    permission: string;
  } & Timestamped
>;
export type AccessPolicyContext = Readonly<{
  actorAccountId: string;
  organisationId: string;
  permission: string;
  resource: Readonly<{ type: string; id?: string; ownerAccountId?: string }>;
  facts: Readonly<Record<string, unknown>>;
}>;
