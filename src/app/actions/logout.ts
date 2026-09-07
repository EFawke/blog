'use server'

import { destroySession } from '@/app/lib/session'
import { redirect } from 'next/navigation'

export async function logout() {
  await destroySession()
  redirect('/signin')
}