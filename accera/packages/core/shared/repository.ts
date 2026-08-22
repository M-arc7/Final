/** Persistence port; adapters may use Supabase, but no query implementation belongs here. */
export interface Repository<Id, Record> { findById(id: Id): Promise<Record | null>; insert(record: Record): Promise<Record>; replace(record: Record): Promise<Record>; delete(id: Id): Promise<void>; }
