# Changelog

Notable changes to this service, kept for the audit trail. Newest entries go at the top.

## 2026-10-22 — SEC-101: Fix broken access control on GET /accounts/:id

- Added ownership check: only the account's owner (matched by `ownerId === userId`) may retrieve it.
- All cross-account attempts now return HTTP 403 and are recorded via `logAccessDenied` in `src/audit.ts`.
- Added doc comment to the route handler describing the access-control contract.
