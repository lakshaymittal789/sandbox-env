# Changelog

Notable changes to this service, kept for the audit trail. Newest entries go at the top.

## Unreleased

### Security

- **SEC-101:** `GET /accounts/:id` now returns 403 when an authenticated user requests an account they do not own, instead of returning that account's data. Denied attempts are recorded via the `logAccessDenied` audit helper.
