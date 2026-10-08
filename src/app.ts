import express from 'express'
import { randomUUID } from 'node:crypto'
import { users, accounts } from './users.js'
import { logAccessDenied } from './audit.js'

const sessions = new Map<string, string>() // token -> userId

export function createApp() {
  const app = express()
  app.use(express.json())

  app.post('/login', (req, res) => {
    const { username, password } = req.body ?? {}
    const user = users.find(candidate => candidate.username === username && candidate.password === password)
    if (!user) return res.status(401).json({ error: 'Invalid credentials' })
    const token = randomUUID()
    sessions.set(token, user.id)
    res.json({ token })
  })

  // Access control: requires a valid session token (401 otherwise) and only returns an
  // account owned by the session user. Requests for another user's account get 403 and
  // are recorded with logAccessDenied.
  app.get('/accounts/:id', (req, res) => {
    const token = req.header('authorization')?.replace(/^Bearer\s+/i, '')
    const userId = token ? sessions.get(token) : undefined
    if (!userId) return res.status(401).json({ error: 'Unauthorized' })

    const account = accounts.find(candidate => candidate.id === req.params.id)
    if (!account) return res.status(404).json({ error: 'Account not found' })

    if (account.ownerId !== userId) {
      logAccessDenied({ actorId: userId, resource: `account:${account.id}`, reason: 'not_owner' })
      return res.status(403).json({ error: 'Forbidden' })
    }

    res.json(account)
  })

  return app
}
