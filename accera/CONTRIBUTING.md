# Contributing to ACCERA

## Before changing code

1. Read the affected product, domain, API and security documents in `docs/`.
2. Check `docs/08-decisions/` for constraints that apply to the design.
3. Add or amend an ADR before implementing a decision that changes a system
   boundary, persistence model, security model, integration or long-lived tool.

## Implementation rules

- Keep business rules in the owning domain package or database policy; applications
  orchestrate UI and do not fork rules between roles.
- Validate untrusted input at the API/Edge Function boundary. Never rely on client
  validation for authorization or financial correctness.
- Scope tenant reads and writes through organisation membership and RLS. Privileged
  service-role access is server-only, narrowly scoped and audited.
- Make financial, booking, registration and webhook mutations idempotent.
- Add an ordered, forward-only Supabase migration for persistent model changes and
  update generated database types after applying it.

## Quality gate

Run `pnpm format:check`, `pnpm lint`, `pnpm typecheck`, and the applicable tests
before requesting review. Include tests for success, authorization denial, invalid
input and repeat delivery where the change is stateful. Update documentation in the
same change when a contract, configuration value, schema or operating procedure
changes.

## Pull requests

Describe the user outcome, domain owner, data/security impact, migrations,
operational impact and rollback plan. Keep unrelated formatting or refactors out of
the change. At least one reviewer must verify a security-sensitive or cross-domain
change against its documentation and ADRs.

## Security reporting

Do not open a public issue for a suspected vulnerability or expose credentials in a
ticket, commit or log. Follow `docs/06-security/incident-management.md` and contact
the designated security owner through the private reporting channel.
