import type { PermissionCheck } from "../permission-checks";
import type { AccessPolicyRepository } from "./access-policy.repository";
/** Contextual policy evaluation. A policy cannot grant access unless role/permission evaluation already succeeded. */ export class AccessPolicyService {
  constructor(private readonly repository: AccessPolicyRepository) {}
  async evaluate(request: PermissionCheck): Promise<boolean> {
    if (!request.actorAccountId || !request.organisationId) return false;
    const policies = await this.repository.listApplicable(
      request.permission,
      request.organisationId,
    );
    return policies.every((policy) => policy.enabled);
  }
}
