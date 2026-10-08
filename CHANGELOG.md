# Changelog

Notable changes to this service, kept for the audit trail. Newest entries go at the top.

## Unreleased

### Security

- **SEC-101:** `GET /accounts/:id` now returns 403 when the requested account belongs to another user, instead of returning that user's account data. Denied cross-account attempts are recorded via `logAccessDenied`.
