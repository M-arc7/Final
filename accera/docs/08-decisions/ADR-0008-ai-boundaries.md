# ADR-0008: Ai Boundaries

- **Status:** Accepted
- **Date:** 2026-08-22
- **Decision owners:** ACCERA architecture group

## Context

ACCERA requires documented decisions that prevent later contributors from reinterpreting core platform constraints.

## Decision

Use AI only through governed services for assistive/derived work, never as the authority for core business or access decisions.

## Consequences

Protects determinism, explainability, cost and sensitive data while allowing supervised intelligence features.

Implementation must update the relevant architecture, domain, security and operational documents, with tests or runbooks that demonstrate compliance.

## Alternatives rejected

Embedding model calls directly in product components or allowing model output to mutate core records without review.

## Revisit when

Material evidence changes the stated rationale: product scale, regulatory requirement, provider capability, cost, reliability, security posture or a validated migration path. Any replacement requires a new ADR and a transition plan.
