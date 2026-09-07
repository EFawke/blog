'use client'

import { signin } from '@/app/actions/signin'
import { Card, Heading, Text, Button, Flex, TextField, Link, Theme, Callout } from '@radix-ui/themes'
import { useActionState } from 'react'
import { useState } from "react";
import { EyeOpenIcon, EyeClosedIcon } from "@radix-ui/react-icons";

export default function Login() {
  const [state, action, pending] = useActionState(signin, undefined);
  const [show, setShow] = useState(false);

  const handleClick = () => {
    setShow(!show);
  }

  return (
    <Theme radius='large'>
      <Card style={{ width: '450px', padding: '0' }}>
        <Flex pb='5' pt='5' pl='5' pr='5' direction='column'>
          <Heading size='5' mb='3'>Sign in</Heading>
          <Flex mb='4'>
            <Text size='2' mb='4'>Don't have an account? <Link href='/register' style={{ textDecoration: 'underline', cursor: 'pointer' }}>Register</Link></Text>
          </Flex>
          <form action={action}>
            <Flex direction="column" gap="3">
              {state?.message && (
                <Callout.Root color="red" size="1">
                  <Callout.Text>{state.message}</Callout.Text>
                </Callout.Root>
              )}

              <Text as="label" htmlFor='name' size="2" mb="1" weight="bold">
                Username or email
              </Text>
              <TextField.Root required
                placeholder="me@domain.com"
                id='name'
                name='name'
                enterKeyHint='next'
                autoComplete='username'
                color={state?.errors?.name ? 'red' : undefined}
              />
              {state?.errors?.name && (
                <Text size="1" color="red">{state.errors.name[0]}</Text>
              )}

              <Text as="label" htmlFor='password' size="2" mb="1" weight="bold">
                Password
              </Text>
              <TextField.Root
                placeholder='Your password'
                required
                minLength={8}
                id='password'
                name='password'
                autoComplete='current-password'
                enterKeyHint='done'
                type={show ? "text" : "password"}
                color={state?.errors?.password ? 'red' : undefined}
              >
                <TextField.Slot side="right" style={{ cursor: "pointer" }}>
                  {show
                    ? <EyeOpenIcon onClick={handleClick} height="16" width="16" />
                    : <EyeClosedIcon onClick={handleClick} height="16" width="16" />
                  }
                </TextField.Slot>
              </TextField.Root>
              {state?.errors?.password && (
                <Text size="1" color="red">{state.errors.password[0]}</Text>
              )}
            </Flex>

            <Flex gap="3" mt="4" justify="end">
              <Button type="submit" disabled={pending} style={{ cursor: "pointer" }}>
                {pending ? "Just a sec..." : "Sign in"}
              </Button>
            </Flex>
            <Link className='forgotpwlink' size='2' style={{ cursor: 'pointer' }}>Forgot your password?</Link>
          </form>
        </Flex>
      </Card>
    </Theme>
  )
}