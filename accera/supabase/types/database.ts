/**
 * GENERATED OUTPUT CONTRACT
 * Regenerate after applying migrations with:
 *   supabase gen types typescript --local --schema public > supabase/types/database.ts
 * Do not add application logic to this file.
 */
import type {
  CompetitionStatus,
  OrganisationMemberStatus,
  RecordStatus,
  TransactionStatus,
} from "./enums";
import type {
  HasOrganisationPermissionArgs,
  IsOrganisationMemberArgs,
} from "./functions";

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];
export type Database = {
  public: {
    Tables: Record<
      string,
      {
        Row: Record<string, unknown>;
        Insert: Record<string, unknown>;
        Update: Record<string, unknown>;
        Relationships: [];
      }
    >;
    Views: Record<string, { Row: Record<string, unknown> }>;
    Functions: {
      has_organisation_permission: {
        Args: HasOrganisationPermissionArgs;
        Returns: boolean;
      };
      is_organisation_member: {
        Args: IsOrganisationMemberArgs;
        Returns: boolean;
      };
    };
    Enums: {
      record_status: RecordStatus;
      organisation_member_status: OrganisationMemberStatus;
      competition_status: CompetitionStatus;
      transaction_status: TransactionStatus;
    };
    CompositeTypes: Record<string, never>;
  };
};
