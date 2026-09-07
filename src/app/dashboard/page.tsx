import { verifySession } from '@/app/lib/session'
import { redirect } from 'next/navigation'
import { AdminDashboard } from '@/app/dashboard/AdminDashboard'
import { UserDashboard } from '@/app/dashboard/UserDashboard'
import { Container, Flex } from '@radix-ui/themes'

export default async function Dashboard() {
  const session = await verifySession()

  if (!session) redirect('/signin')

  return (
    <Container mb="9" mt="0" px={{ initial: '4', sm: '6' }}>
      <Flex pt='9' pb='9' gap="4" direction="row" style={{ position: "relative", width: "100%"}}>
          {
            session.isAdmin ? <AdminDashboard /> : <UserDashboard />
          }
      </Flex>
    </Container>
  )
}