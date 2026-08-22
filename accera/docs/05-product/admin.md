# ACCERA Admin

> **Status:** Baseline controlled specification. Update this document in the same change as any contract it governs.

## Purpose and boundary

Platform administration of users, organisations, sports, facilities, competitions, finance, content, intelligence, compliance, audit and configuration.

Privileged actions require least privilege, reason capture, audit records and explicit impersonation safeguards.

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

Role-specific functional contract; UI implementation must use owned domain contracts. This page is authoritative only for the boundary stated above; it links to, rather than repeats, details owned by another document.
