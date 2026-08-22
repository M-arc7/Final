# ACCERA Row Level Security

> **Status:** Authoritative database security contract. Implemented by the RLS migration series; tested with permitted and denied actors.

## Boundary

RLS decides whether the current Supabase session may perform an operation on a
specific row. It is not UI visibility and it is not the general permission model.

```text
Authentication: account → session → identity
Authorisation: identity → role → permission
RLS:           permission + row relationship + operation → database decision
```

The identity source is always `auth.uid()`. A user-supplied `user_id`,
`organisation_id`, role, or client-side claim is never proof of access.

## Default-deny and operations

`00014_rls.sql` enables RLS on every public application table. A client needs both
database privileges and a matching policy; no policy means no access. `SELECT`,
`INSERT`, `UPDATE`, and `DELETE` are modelled separately. An update policy must
validate both the existing row (`USING`) and proposed row (`WITH CHECK`).

Client writes that need multi-row integrity, payments, provider callbacks, state
transitions, or audit creation are deliberately policy-free and run only through
an audited server-side workflow. Service-role credentials never reach browser or
mobile code; they are a server-only bypass, not an application permission.

## Security predicates

The RLS foundation defines these security-definer predicates with a fixed search
path and boolean-only public RPC wrappers where needed:

| Predicate                                         | Decision                                                                |
| ------------------------------------------------- | ----------------------------------------------------------------------- |
| `app.is_active_account()`                         | Authenticated, active, non-deleted account                              |
| `app.is_platform_admin()`                         | Controlled platform administrative role                                 |
| `app.owns_record(user_id)`                        | Current actor owns a user-scoped record                                 |
| `app.is_organisation_member(id)`                  | Active organisation membership                                          |
| `app.has_organisation_role(id, role)`             | Specific scoped role                                                    |
| `app.has_permission(permission)`                  | Effective platform permission                                           |
| `app.has_organisation_permission(id, permission)` | Effective organisation permission or platform-admin override            |
| `app.can_access_facility(id)`                     | Facility permission or active staff relationship                        |
| `app.can_access_academy(id)`                      | Academy permission, coach, athlete, or authorised guardian relationship |
| `app.can_access_competition(id)`                  | Competition permission, participant, or official relationship           |

Platform administration is an explicit bypass in these predicates. Organisation
membership alone is not an inheritance grant: domain policies request the relevant
permission. Parent/child organisation topology is not implicitly traversed.

## Scope matrix

| Scope                    | Tables and rule                                                                                                                                                                                                                                        |
| ------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Public reference/content | Active sports, disciplines, categories, active commerce catalogue data, published articles/posts, and public competition projections have explicit anonymous `SELECT` policies only.                                                                   |
| User-owned               | Profiles, settings, files, notifications, carts, and personal messages are restricted to the owner; profiles and private athlete information are never public by implication.                                                                          |
| Organisation             | Organisations, memberships, roles, settings, sponsorship, finance, and intelligence use the requested organisation permission for the operation.                                                                                                       |
| Facility                 | Facilities, venues, resources, availability, staff, bookings, and check-ins resolve scope through the facility and its organisation. Customers see their own bookings; facility managers see authorised facility bookings.                             |
| Academy                  | Programs, classes, sessions, coaching, enrolment, attendance, assessments, and progression records resolve athlete, guardian, coach, or organisation relationships. Read access does not grant attendance editing.                                     |
| Competition              | Competitions, categories, registrations, draws, matches, officials, and rankings resolve organiser permissions, participant registration, or official assignment. Published projections are separately public.                                         |
| Sensitive                | Finance is read-only to an owner or finance permission and has no client write policies. Performance data is athlete/guardian or explicit performance-permission scoped. Audit logs are append-only and readable only by platform or audit permission. |

## Ownership and relationship rules

Child tables do not trust an organisation ID supplied by the client. They derive
access through their parent resource: venue/resource → facility, class/session →
academy program, match/category → competition, order item/shipment → order, and
contract/report → sponsorship campaign. A user in Organisation A cannot access a
child of Organisation B merely by knowing its identifier.

For inserts, `WITH CHECK` verifies ownership and scope. Where a user may create a
row, the policy checks that `customer_id`, `sender_id`, `registered_by`, or similar
actor field equals `auth.uid()` and that the parent relationship is valid. RLS cannot
express all field-level state-machine rules; Edge Functions enforce those in addition
to RLS and write audit records.

## Audit, privacy, and anonymous access

Audit rows have no client insert/update/delete policy. Trusted services append them;
platform administrators or actors with `audit.read` can read only the relevant rows.
Private profile, athlete, financial, performance, and recommendation data stays
relationship-scoped. Anonymous access is opt-in per table, with `anon` granted only
the explicit public read tables above.

## Migration and type contract

`00014_rls.sql` owns predicates and default-deny. `00016_rls_core.sql` through
`00027_rls_intelligence.sql` own domain policies. The existing indexes migration
predates the split and remains in place to preserve forward-only migration history;
new domains add RLS before their indexes.

`supabase/types/database.ts`, `enums.ts`, `functions.ts`, and `views.ts` describe
the applied schema/RPC surface only. They do not enforce RLS and must be regenerated
after database changes.

## Verification

RLS tests must cover anonymous, active and disabled authenticated users, own and
other-user records, member/non-member, organisation admin, facility manager, coach,
official, athlete, parent/guardian, platform admin, and cross-organisation access.
For every exposed resource, assert allowed and denied `SELECT`, `INSERT`, `UPDATE`,
and `DELETE` cases. The negative cases are mandatory.

Related controls: [authentication](../06-security/authentication.md),
[authorization](../06-security/authorization.md), [privacy](../06-security/privacy.md),
and [audit](../06-security/audit.md).
