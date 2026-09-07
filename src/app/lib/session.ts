'use server'

import 'server-only'
import { cookies } from 'next/headers'
import { randomBytes, createHash } from 'crypto'
import { Client } from 'pg'

const COOKIE_NAME = 'session'
const DURATION_MS = 1000 * 60 * 60 * 24 * 7 // 7 days

const hashToken = (token: string) => createHash('sha256').update(token).digest('hex')

export async function createSession(userId: string) {
  const token = randomBytes(32).toString('hex')      // the secret; goes in the cookie
  const tokenHash = hashToken(token)                  // what we store
  const expiresAt = new Date(Date.now() + DURATION_MS)

  const client = new Client({ connectionString: process.env.DATABASE_URL })
  try {
    await client.connect()
    await client.query(
      `INSERT INTO sessions (id, user_id, expires_at) VALUES ($1, $2, $3);`,
      [tokenHash, userId, expiresAt],
    )
  } finally {
    await client.end()
  }

  const cookieStore = await cookies()
  cookieStore.set(COOKIE_NAME, token, {
    httpOnly: true,                                   // JS can't read it → XSS can't steal it
    secure: process.env.NODE_ENV === 'production',    // HTTPS-only in prod, but works on http in dev
    sameSite: 'lax',                                  // sent on top-level navigations, blocks CSRF
    path: '/',
    expires: expiresAt,
  })
}

export async function verifySession() {
  const cookieStore = await cookies()
  const token = cookieStore.get(COOKIE_NAME)?.value
  if (!token) return null

  const tokenHash = hashToken(token)
  const client = new Client({ connectionString: process.env.DATABASE_URL })
  try {
    await client.connect()
    const res = await client.query(
      `SELECT s.expires_at, s.user_id, u.username, u.is_admin
       FROM sessions s
       JOIN users u ON u.id = s.user_id
       WHERE s.id = $1;`,
      [tokenHash],
    )
    if (!res.rows.length) return null

    const row = res.rows[0]
    if (new Date(row.expires_at) < new Date()) {
      await client.query(`DELETE FROM sessions WHERE id = $1;`, [tokenHash]) // expired → clean up
      return null
    }

    return {
      userId: row.user_id as string,
      username: row.username as string,
      isAdmin: row.is_admin as boolean,
    }
  } finally {
    await client.end()
  }
}

export async function destroySession() {
  const cookieStore = await cookies()
  const token = cookieStore.get(COOKIE_NAME)?.value
  if (token) {
    const tokenHash = hashToken(token)
    const client = new Client({ connectionString: process.env.DATABASE_URL })
    try {
      await client.connect()
      await client.query(`DELETE FROM sessions WHERE id = $1;`, [tokenHash])
    } finally {
      await client.end()
    }
  }
  cookieStore.delete(COOKIE_NAME)
}