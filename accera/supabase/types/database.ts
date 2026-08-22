/**
 * GENERATED OUTPUT CONTRACT
 * Regenerate after applying migrations with:
 *   supabase gen types typescript --local --schema public > supabase/types/database.ts
 * Do not add application logic to this file.
 */
export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];
export type Database = { public: { Tables: Record<string, { Row: Record<string, unknown>; Insert: Record<string, unknown>; Update: Record<string, unknown>; Relationships: []; }>; Views: Record<string, { Row: Record<string, unknown> }>; Functions: Record<string, { Args: Record<string, unknown>; Returns: unknown }>; Enums: Record<string, string>; CompositeTypes: Record<string, never>; }; };
