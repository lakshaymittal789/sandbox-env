import { describe, expect, it } from 'vitest'
import request from 'supertest'
import { createApp } from '../src/app.js'

async function loginAs(app: ReturnType<typeof createApp>, username: string, password: string) {
  const response = await request(app).post('/login').send({ username, password })
  return response.body.token as string
}

describe('GET /accounts/:id', () => {
  it('lets a user fetch their own account', async () => {
    const app = createApp()
    const token = await loginAs(app, 'alice', 'alice-pass')
    const response = await request(app).get('/accounts/a-1').set('Authorization', `Bearer ${token}`)
    expect(response.status).toBe(200)
    expect(response.body.id).toBe('a-1')
  })

  it('blocks a user from fetching another user\'s account (SEC-101)', async () => {
    const app = createApp()
    const token = await loginAs(app, 'alice', 'alice-pass')
    const response = await request(app).get('/accounts/a-2').set('Authorization', `Bearer ${token}`)
    expect(response.status).toBe(403)
  })

  it('rejects requests with no session token', async () => {
    const app = createApp()
    const response = await request(app).get('/accounts/a-1')
    expect(response.status).toBe(401)
  })
})
