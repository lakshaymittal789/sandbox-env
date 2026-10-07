# Accounts API

A small internal service exposing account balances behind a session-token login.

```
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

- **SEC-101** — `GET /accounts/:id` must only return the requesting user's own account. A regression test for this already exists in `tests/accounts.test.ts` and is currently failing.
