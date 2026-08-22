/** Generated enum boundary; regenerate alongside database.ts. */
export type RecordStatus = "active" | "inactive" | "archived" | "deleted";
export type BookingStatus =
  | "pending"
  | "confirmed"
  | "cancelled"
  | "completed"
  | "no_show";
export type TransactionStatus =
  | "pending"
  | "authorized"
  | "settled"
  | "failed"
  | "refunded"
  | "void";
export type OrganisationMemberStatus =
  | "invited"
  | "active"
  | "suspended"
  | "removed";
export type CompetitionStatus =
  | "draft"
  | "published"
  | "registration_open"
  | "in_progress"
  | "completed"
  | "cancelled";
