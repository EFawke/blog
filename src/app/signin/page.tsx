import Login from "../ui/signup-form"
import { Container, Flex, Section } from "@radix-ui/themes"

export default function LoginPage() {
  return (
    <Container px={{ initial: '4', sm: '6' }} mb="9"
      mt="0">
      <Flex
        gap="4"
        direction="row"
        style={{
          position: "relative",
          width: "100%"
        }}>
        <Section
          pt='9'
          pb='9'
          style={{
            height: 'calc(100vh - (var(--space-9) + var(--space-9)))',
            position: 'sticky',
            top: 'calc(var(--space-3) + var(--space-3) + 4rem)',
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
          }}
        >
          <Login />
        </Section>

      </Flex>
    </Container>
  )
}