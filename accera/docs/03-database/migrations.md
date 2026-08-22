# ACCERA Migrations

> **Status:** Baseline controlled specification. Update this document in the same change as any contract it governs.

## Purpose and boundary

Migration naming, ordering, dependencies, expand/contract rollouts, verification and rollback philosophy.

Migrations are forward-only, transactional where possible, safe for existing production data and paired with policy/index changes.

## Implementation contract

- Name the accountable domain or operational owner before adding a new capability.
- Link changes to the source implementation, schema migration, API/event contract and tests that enforce the stated rule.
- Preserve organisation scoping, audit context, privacy classification and error/retry behavior at every boundary.
- Record a new ADR when this document's decision changes a durable architecture, tenancy, payment, identity or integration choice.

## Required content when this specification is expanded

1. Definitions and state/lifecycle rules, including allowed transitions and invalid states.
2. Actors, permissions, tenant boundaries and consent/privacy implications.
3. Owned data and contracts: commands, queries, events, storage or operational artifacts.
4. Failure behavior, idempotency/concurrency where applicable, observability and test evidence.
5. Explicit links to related documents without copying their authoritative details.

## Non-duplication rule

Database design contract; actual change is delivered through reviewed Supabase migrations. This page is authoritative only for the boundary stated above; it links to, rather than repeats, details owned by another document.
