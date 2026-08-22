import type { EntityStatus } from "./primitives";
export const canTransitionStatus = (
  from: EntityStatus,
  to: EntityStatus,
): boolean => {
  if (from === "deleted") return false;
  return from !== to;
};
