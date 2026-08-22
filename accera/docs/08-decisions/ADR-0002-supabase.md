# ADR-0002: Supabase

- **Status:** Accepted
- **Date:** 2026-08-22
- **Decision owners:** ACCERA architecture group

## Context

ACCERA requires documented decisions that prevent later contributors from reinterpreting core platform constraints.

## Decision

Use Supabase PostgreSQL, Auth, Storage, Realtime and Edge Functions as the managed application platform.

## Consequences

It provides relational integrity, RLS and managed primitives suited to a tenant-aware sports platform; provider adapters protect portability.

Implementation must update the relevant architecture, domain, security and operational documents, with tests or runbooks that demonstrate compliance.

## Alternatives rejected

A custom-auth plus self-managed database stack at the foundation stage.

## Revisit when

Material evidence changes the stated rationale: product scale, regulatory requirement, provider capability, cost, reliability, security posture or a validated migration path. Any replacement requires a new ADR and a transition plan.
