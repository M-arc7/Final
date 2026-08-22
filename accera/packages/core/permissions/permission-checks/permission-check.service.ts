import type { AccessPolicyService } from "../access-policies";
import type {
  PermissionCheck,
  PermissionDecision,
} from "./permission-check.types";
import type { PermissionCheckRepository } from "./permission-check.repository";
/** Fail-closed authorization engine. Authentication must already have supplied actor identity. */ export class PermissionCheckService {
  constructor(
    private readonly repository: PermissionCheckRepository,
    private readonly policies: AccessPolicyService,
  ) {}
  async check(request: PermissionCheck): Promise<PermissionDecision> {
    try {
      if (!request.actorAccountId)
        return { allowed: false, reason: "unauthenticated" };
      if (!request.organisationId)
        return { allowed: false, reason: "missing_context" };
      if (
        !(await this.repository.isActiveOrganisationMember(
          request.actorAccountId,
          request.organisationId,
        ))
      )
        return { allowed: false, reason: "not_a_member" };
      const permissions = await this.repository.resolvePermissionCodes(
        request.actorAccountId,
        request.organisationId,
        request.resource,
      );
      if (!permissions.includes(request.permission))
        return { allowed: false, reason: "missing_permission" };
      return (await this.policies.evaluate(request))
        ? { allowed: true, reason: "allowed" }
        : { allowed: false, reason: "policy_denied" };
    } catch {
      return { allowed: false, reason: "indeterminate" };
    }
  }
}
