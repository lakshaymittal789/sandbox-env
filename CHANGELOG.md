# Changelog

Notable changes to this service, kept for the audit trail. Newest entries go at the top.

## 2026-10-09

- **Feature (AB#2440):** `GET /login` serves a login page with email and password fields. Empty fields show inline errors without a page reload; a valid-looking email with a non-empty password shows a success message. Validation is client-side only and does not call `POST /login`.
- **Security (SEC-101):** `GET /accounts/:id` now returns 403 when the requested account belongs to a different user, instead of returning that user's account data. Denied cross-account attempts are recorded with the `logAccessDenied` audit helper.
