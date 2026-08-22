import { invariant } from "../../shared/errors";
import { newId } from "../../shared/primitives";
import type { AccessPolicy } from "./access-policy.types";
export const createAccessPolicy = (
  input: Omit<AccessPolicy, "id" | "enabled" | "createdAt" | "updatedAt">,
  now = new Date(),
): AccessPolicy => {
  invariant(
    /^[a-z][a-z0-9_.]*$/.test(input.permission),
    "access_policy.invalid_permission",
    "Policy permission is invalid.",
  );
  return {
    ...input,
    id: newId<"AccessPolicyId">(),
    enabled: true,
    createdAt: now,
    updatedAt: now,
  };
};
