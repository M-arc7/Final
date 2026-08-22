# ACCERA Supabase Backbone

`supabase/` is ACCERA’s database and backend-execution boundary. It owns managed
Supabase configuration, ordered PostgreSQL migrations, server-side Edge Function
entry points, controlled seed data and generated database type artifacts. It does
not own client presentation or duplicate domain rules in applications.

## Dependency order

Migrations are intentionally ordered and forward-only:

```text
extensions → core → organisations → sports → facilities → academy → competition
→ finance → commerce → sponsorship → performance → content → intelligence → RLS → indexes
```

Do not rename, edit after production application, or reorder an existing migration.
Add a new numbered migration for every schema evolution. `00014_rls.sql` establishes
the database tenant boundary; Edge Functions add operation-level permission and
validation checks but never replace RLS.

## Edge Functions

Each entry point uses `functions/_shared/` for CORS, JSON validation,
authentication, response/error shape and structured logging. This is deliberate:
individual functions must not reimplement or weaken the enforcement boundary.

The generated operation files are safe contracts, not implicit client permissions.
An operation without its domain-specific workflow explicitly returns
`operation_not_implemented` (HTTP 501) rather than performing a partially checked
write. Implement it by adding strict input parsing, organisation-permission checks,
an idempotent state transition, audit/event records and tests in its own file.

## Seeds and types

Development/staging seed files are controlled fixtures; production contains only
approved reference data. Auth identities and credentials are provisioned outside
committed SQL. Regenerate `types/database.ts` from the applied database after schema
changes; do not add application behavior to generated types.

## Verification

```bash
pnpm supabase:check
```

This validates the controlled migration sequence and that the required runtime,
seed and type artifacts are present and non-empty. It complements—not replaces—a
local `supabase db reset` or CI migration application against PostgreSQL.
