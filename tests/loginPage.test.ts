import { describe, expect, it } from 'vitest'
import request from 'supertest'
import { createApp } from '../src/app.js'

describe('GET /login (AB#2440)', () => {
  it('serves a login page with email, password and submit controls', async () => {
    const response = await request(createApp()).get('/login')
    expect(response.status).toBe(200)
    expect(response.headers['content-type']).toMatch(/text\/html/)
    expect(response.text).toContain('id="email"')
    expect(response.text).toContain('type="password"')
    expect(response.text).toContain('type="submit"')
    expect(response.text).toContain('event.preventDefault()')
  })
})
