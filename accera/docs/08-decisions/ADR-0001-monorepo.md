# ADR-0001: Monorepo

- **Status:** Accepted
- **Date:** 2026-08-22
- **Decision owners:** ACCERA architecture group

## Context

ACCERA requires documented decisions that prevent later contributors from reinterpreting core platform constraints.

## Decision

Use a pnpm/Turborepo monorepo for coordinated applications, packages, services and configuration.

## Consequences

Shared domain contracts and design primitives need atomic changes; independent deployment remains possible through task filtering.

Implementation must update the relevant architecture, domain, security and operational documents, with tests or runbooks that demonstrate compliance.

## Alternatives rejected

Separate repositories, which would duplicate versioning and make cross-role contract changes unsafe.

## Revisit when

Material evidence changes the stated rationale: product scale, regulatory requirement, provider capability, cost, reliability, security posture or a validated migration path. Any replacement requires a new ADR and a transition plan.
