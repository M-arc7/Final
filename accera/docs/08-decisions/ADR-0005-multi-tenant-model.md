# ADR-0005: Multi Tenant Model

- **Status:** Accepted
- **Date:** 2026-08-22
- **Decision owners:** ACCERA architecture group

## Context

ACCERA requires documented decisions that prevent later contributors from reinterpreting core platform constraints.

## Decision

Model organisations as first-class tenants and enforce access through membership, scoped permissions and RLS.

## Consequences

Organisations, branches and relationships need explicit topology while users can participate in multiple tenants.

Implementation must update the relevant architecture, domain, security and operational documents, with tests or runbooks that demonstrate compliance.

## Alternatives rejected

Database-per-tenant or a client-supplied tenant ID without RLS.

## Revisit when

Material evidence changes the stated rationale: product scale, regulatory requirement, provider capability, cost, reliability, security posture or a validated migration path. Any replacement requires a new ADR and a transition plan.
