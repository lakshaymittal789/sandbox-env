import { describe, expect, it } from 'vitest'
import request from 'supertest'
import { createApp } from '../src/app.js'
import { validateLogin } from '../src/loginPage.js'

describe('GET /login (AB#2440)', () => {
  it('serves a login page with email, password and submit button', async () => {
    const response = await request(createApp()).get('/login')
    expect(response.status).toBe(200)
    expect(response.type).toBe('text/html')
    expect(response.text).toContain('<input id="email" name="email" type="email"')
    expect(response.text).toContain('<input id="password" name="password" type="password"')
    expect(response.text).toContain('<button type="submit">')
  })

  it('handles submission in the page without a reload', async () => {
    const response = await request(createApp()).get('/login')
    expect(response.text).toContain('event.preventDefault()')
    expect(response.text).toContain('function validateLogin')
  })
})

describe('validateLogin', () => {
  it('rejects an empty email or password', () => {
    expect(validateLogin('', 'secret')).toBe('Email and password are required.')
    expect(validateLogin('alice@example.com', '')).toBe('Email and password are required.')
    expect(validateLogin('   ', '')).toBe('Email and password are required.')
  })

  it('rejects an email that does not look valid', () => {
    expect(validateLogin('alice', 'secret')).toBe('Enter a valid email address.')
  })

  it('accepts a valid-looking email and non-empty password', () => {
    expect(validateLogin('alice@example.com', 'secret')).toBeNull()
  })
})
