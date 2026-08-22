# ACCERA System Architecture

> **Status:** Baseline controlled specification. Update this document in the same change as any contract it governs.

## Purpose and boundary

The top-level system: role-specific applications, shared packages, Supabase/PostgreSQL, Edge Functions, workers, integrations, infrastructure and user devices.

Show data/control flow and trust boundaries. The detail of a layer lives in its dedicated architecture document.

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

Technical boundary specification; implementation details must align with the relevant domain and security pages. This page is authoritative only for the boundary stated above; it links to, rather than repeats, details owned by another document.
