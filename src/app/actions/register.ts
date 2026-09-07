'use server'

import { FormState, RegisterFormSchema } from '@/app/lib/definitions'
import { z } from 'zod'
import bcrypt from 'bcrypt'
import { Client } from 'pg'
import { createSession } from '../lib/session'
import { redirect } from 'next/navigation'

export async function register(state: FormState, formData: FormData): Promise<FormState> {
    const validated = RegisterFormSchema.safeParse({
        name: formData.get('name'),
        email: formData.get('email'),
        password: formData.get('password'),
    })

    if (!validated.success) {
        return { errors: z.flattenError(validated.error).fieldErrors }
    }

    const { name, email, password } = validated.data
    const passwordHash = await bcrypt.hash(password, 12)
    let userId: string
    const client = new Client({ connectionString: process.env.DATABASE_URL })
    try {
        await client.connect()
        const res = await client.query(
            `INSERT INTO users (email, username, password_hash)
       VALUES ($1, $2, $3) RETURNING id;`,
            [email, name, passwordHash],
        )
        userId = res.rows[0].id
    } catch (err: unknown) {
        if (typeof err === 'object' && err !== null && 'code' in err && err.code === '23505') {
            const constraint = (err as { constraint?: string }).constraint
            if (constraint?.includes('email')) return { errors: { email: ['That email is already registered.'] } }
            if (constraint?.includes('username')) return { errors: { name: ['That username is taken.'] } }
            return { message: 'An account with those details already exists.' }
        }
        console.error('Registration failed:', err)
        return { message: 'Something went wrong. Please try again.' }
    } finally {
        await client.end()
    }

    await createSession(userId)
    redirect('/')
}