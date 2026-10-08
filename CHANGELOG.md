# Changelog

Notable changes to this service, kept for the audit trail. Newest entries go at the top.

## 2026-10-09

- **Security (SEC-101):** `GET /accounts/:id` now returns 403 when the requested account belongs to a different user, instead of returning that user's account data. Denied cross-account attempts are recorded with the `logAccessDenied` audit helper.
