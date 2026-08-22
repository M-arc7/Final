# ACCERA Core

`@accera/core` owns technology-independent identity, organisation, user, access,
membership, communication, file, search, audit and settings contracts. Applications
consume this package; they must not reconstruct account, permission, membership or
organisation logic.

## Layer contract

| Layer | Contains | Must not contain |
| --- | --- | --- |
| `*.entity.ts` | Domain representation, invariants and state transitions | Database/API/UI calls |
| `*.types.ts` | Type contracts | Runtime behavior |
| `*.schema.ts` | Zod runtime validation | Persistence |
| `*.repository.ts` | Persistence ports | Business policy or queries embedded in services |
| `*.service.ts` | Use cases and deterministic orchestration | UI or provider SDK calls |
| `*.providers.ts` | External identity/provider ports | Domain rules |
| `*.rules.ts` | Pure deterministic rules | Persistence |
| `index.ts` | Public exports only | Implementation logic |

Repositories are ports. The Supabase implementation belongs in infrastructure or the
database package, injected into a service at the composition root. This preserves
the one-account and multi-organisation model across every application.
