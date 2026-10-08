# Changelog

Notable changes to this service, kept for the audit trail. Newest entries go at the top.

## Unreleased

- **Security (SEC-101):** `GET /accounts/:id` now only returns the requesting user's own account. Requests for another user's account return 403 instead of that account's data, and each denied attempt is recorded with the `logAccessDenied` audit helper.
