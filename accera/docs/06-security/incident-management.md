# ACCERA Incident Management

> **Status:** Baseline controlled specification. Update this document in the same change as any contract it governs.

## Purpose and boundary

Security incident detection, triage, containment, investigation, remediation and closure.

Define severity, incident commander, evidence handling, communications, notification obligations and lessons learned.

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

Mandatory control requirements; exceptions need security-owner approval and an expiry. This page is authoritative only for the boundary stated above; it links to, rather than repeats, details owned by another document.
