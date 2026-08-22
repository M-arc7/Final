# ADR-0003: Application Boundaries

- **Status:** Accepted
- **Date:** 2026-08-22
- **Decision owners:** ACCERA architecture group

## Context

ACCERA requires documented decisions that prevent later contributors from reinterpreting core platform constraints.

## Decision

Provide role-specific applications that compose shared domain packages.

## Consequences

Player, coach, facility, competition, official and admin workflows differ materially, while business rules and contracts must remain singular.

Implementation must update the relevant architecture, domain, security and operational documents, with tests or runbooks that demonstrate compliance.

## Alternatives rejected

One universal UI with role flags, or per-role duplicated domain implementations.

## Revisit when

Material evidence changes the stated rationale: product scale, regulatory requirement, provider capability, cost, reliability, security posture or a validated migration path. Any replacement requires a new ADR and a transition plan.
