import type { AccessPolicy } from "./access-policy.types";
export interface AccessPolicyRepository {
  listApplicable(
    permission: string,
    organisationId: string,
  ): Promise<readonly AccessPolicy[]>;
}
