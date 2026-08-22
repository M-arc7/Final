export type PermissionDecision = Readonly<{
  allowed: boolean;
  reason:
    | "allowed"
    | "unauthenticated"
    | "missing_context"
    | "not_a_member"
    | "missing_permission"
    | "policy_denied"
    | "indeterminate";
}>;
export type PermissionCheck = Readonly<{
  actorAccountId?: string;
  permission: string;
  organisationId?: string;
  resource: Readonly<{ type: string; id?: string; ownerAccountId?: string }>;
  context?: Readonly<Record<string, unknown>>;
}>;
