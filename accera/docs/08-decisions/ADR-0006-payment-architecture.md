# ADR-0006: Payment Architecture

- **Status:** Accepted
- **Date:** 2026-08-22
- **Decision owners:** ACCERA architecture group

## Context

ACCERA requires documented decisions that prevent later contributors from reinterpreting core platform constraints.

## Decision

Keep payment providers behind adapters and record ACCERA financial truth in the finance domain.

## Consequences

Provider callbacks are unreliable and provider objects are not a complete ledger; idempotent, audited local records support reconciliation.

Implementation must update the relevant architecture, domain, security and operational documents, with tests or runbooks that demonstrate compliance.

## Alternatives rejected

Provider-specific payment logic embedded in products or treating webhook delivery as the sole state store.

## Revisit when

Material evidence changes the stated rationale: product scale, regulatory requirement, provider capability, cost, reliability, security posture or a validated migration path. Any replacement requires a new ADR and a transition plan.
