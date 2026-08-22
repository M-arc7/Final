# ADR-0007: Event Architecture

- **Status:** Accepted
- **Date:** 2026-08-22
- **Decision owners:** ACCERA architecture group

## Context

ACCERA requires documented decisions that prevent later contributors from reinterpreting core platform constraints.

## Decision

Publish durable, versioned domain events after committed state changes; process side effects asynchronously.

## Consequences

This decouples notifications, analytics, search and integrations while preserving synchronous authority for user-visible decisions.

Implementation must update the relevant architecture, domain, security and operational documents, with tests or runbooks that demonstrate compliance.

## Alternatives rejected

Synchronous fan-out between all domains or unversioned event payloads.

## Revisit when

Material evidence changes the stated rationale: product scale, regulatory requirement, provider capability, cost, reliability, security posture or a validated migration path. Any replacement requires a new ADR and a transition plan.
