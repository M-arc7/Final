# ADR-0004: Authentication Model

- **Status:** Accepted
- **Date:** 2026-08-22
- **Decision owners:** ACCERA architecture group

## Context

ACCERA requires documented decisions that prevent later contributors from reinterpreting core platform constraints.

## Decision

Use Supabase Auth for identity and server-verified JWT sessions, with authorization evaluated separately.

## Consequences

Managed identity supports secure standard flows; organisation membership and RLS provide tenant/resource authorization.

Implementation must update the relevant architecture, domain, security and operational documents, with tests or runbooks that demonstrate compliance.

## Alternatives rejected

Client-trusted roles or application-only authorization without database enforcement.

## Revisit when

Material evidence changes the stated rationale: product scale, regulatory requirement, provider capability, cost, reliability, security posture or a validated migration path. Any replacement requires a new ADR and a transition plan.
