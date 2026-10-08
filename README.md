# Accounts API

A small internal service exposing account balances behind a session-token login.

```
GET  /login            HTML login page (client-side validation only)
POST /login           { username, password } -> { token }
GET  /accounts/:id     Authorization: Bearer <token> -> account
```

## Develop

```
npm install
npm run dev
npm test
```

## Open tickets

- **SEC-101** — `GET /accounts/:id` must only return the requesting user's own account; another user's id should get 403, not their data. A regression test for this already exists in `tests/accounts.test.ts` and is currently failing. Denied cross-account attempts should be recorded with the `logAccessDenied` helper in `src/audit.ts` (already written, not wired up to any route yet). The route should get a short doc comment describing its access-control contract, and the fix should be recorded in `CHANGELOG.md` for the audit trail.
