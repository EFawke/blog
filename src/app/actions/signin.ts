'use server'

import { FormState, SigninFormSchema } from '@/app/lib/definitions'
import { z } from 'zod'
import bcrypt from 'bcrypt'
import { Client } from 'pg'
import { createSession } from '@/app/lib/session'
import { redirect } from 'next/navigation'

const checkIfEmailExists = async (email: string) => {
  const client = new Client({ connectionString: process.env.DATABASE_URL })
  await client.connect()
  const query = `SELECT id, password_hash FROM users WHERE email = $1 OR username = $1;`;
  const res = await client.query(query, [email]);
  await client.end();
  return res.rows;
}

export async function signin(state: FormState, formData: FormData): Promise<FormState> {
  const validated = SigninFormSchema.safeParse({
    name: formData.get('name'),
    password: formData.get('password'),
  })

  if (!validated.success) {
    return {
      errors: z.flattenError(validated.error).fieldErrors,
    }
  }

  const { name, password } = validated.data

  const rows = await checkIfEmailExists(name)
  if (!rows.length) {
    return { message: 'Incorrect username or password.' }
  }
  
  const user = rows[0]
  const ok = await bcrypt.compare(password, user.password_hash)
  if (!ok) return { message: 'Incorrect username or password.' }

  await createSession(user.id)
  redirect('/');
}