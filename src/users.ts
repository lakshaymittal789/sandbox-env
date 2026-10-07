export interface User {
  id: string
  username: string
  password: string
}

export interface Account {
  id: string
  ownerId: string
  balance: number
}

export const users: User[] = [
  { id: 'u-1', username: 'alice', password: 'alice-pass' },
  { id: 'u-2', username: 'bob', password: 'bob-pass' },
]

export const accounts: Account[] = [
  { id: 'a-1', ownerId: 'u-1', balance: 4250 },
  { id: 'a-2', ownerId: 'u-2', balance: 1180 },
]
