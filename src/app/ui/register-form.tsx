'use client'

import { register } from '@/app/actions/register'
import { Card, Heading, Text, Button, Flex, TextField, Link, Theme, Callout } from '@radix-ui/themes'
import { useActionState } from 'react'
import { useState } from "react";
import { EyeOpenIcon, EyeClosedIcon } from "@radix-ui/react-icons";

export default function Register() {
    const [state, action, pending] = useActionState(register, undefined);
    const [show, setShow] = useState(false);

    const handleClick = () => {
        setShow(!show);
    }

    return (
        <Theme radius='large'>
            <Card style={{ width: '450px', padding: '0' }}>
                <Flex pb='5' pt='5' pl='5' pr='5' direction='column'>
                    <Heading size='5' mb='3'>Register</Heading>
                    <Flex mb='4'>
                        <Text size='2' mb='4'>Already have an account? <Link href='/signin' style={{ textDecoration: 'underline', cursor: 'pointer' }}>Sign in</Link></Text>
                    </Flex>
                    <form action={action}>
                        {state?.message && (
                            <Callout.Root color="red" size="1">
                                <Callout.Text>{state.message}</Callout.Text>
                            </Callout.Root>
                        )}
                        <Flex direction="column" gap="3">
                            <Text as="label" htmlFor='name' size="2" mb="1" weight="bold">
                                Username
                            </Text>
                            <TextField.Root required
                                placeholder="How you'd like to be addressed"
                                id='name'
                                name='name'
                                enterKeyHint='next'
                                autoComplete='name'
                                color={state?.errors?.name ? 'red' : undefined}
                            />
                            {state?.errors?.name && (
                                <Text size="1" color="red">{state.errors.name[0]}</Text>
                            )}
                            <Text as="label" htmlFor='email' size="2" mb="1" weight="bold">
                                Email
                            </Text>
                            <TextField.Root required
                                placeholder="me@domain.com"
                                id='email'
                                name='email'
                                type='email'
                                enterKeyHint='next'
                                autoComplete='email'
                                color={state?.errors?.email ? 'red' : undefined}
                            />
                            {state?.errors?.email && (
                                <Text size="1" color="red">{state.errors.email[0]}</Text>
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
                                autoComplete='new-password'
                                enterKeyHint='next'
                                type={show ? "text" : "password"}
                                color={state?.errors?.password ? 'red' : undefined}
                            >
                                <TextField.Slot side="right" style={{ cursor: "pointer" }}>
                                    {
                                        show ?
                                            (
                                                <EyeOpenIcon onClick={handleClick} height="16" width="16" />
                                            )
                                            :
                                            (
                                                <EyeClosedIcon onClick={handleClick} height="16" width="16" />
                                            )
                                    }
                                </TextField.Slot>
                            </TextField.Root>
                            {state?.errors?.password && (
                                <Flex direction="column" gap="1">
                                    <Text size="1" weight="bold" color="red">Password must:</Text>
                                    <ul style={{ margin: 0, paddingLeft: '1.2rem' }}>
                                        {state.errors.password.map((error) => (
                                            <li key={error}>
                                                <Text size="1" color="red">{error}</Text>
                                            </li>
                                        ))}
                                    </ul>
                                </Flex>
                            )}
                        </Flex>

                        <Flex mt="4" justify="end">
                            <Button type="submit" disabled={pending} style={{ cursor: "pointer" }}>
                                {pending ? "Just a sec..." : "Register"}
                            </Button>
                        </Flex>
                    </form>
                </Flex>
            </Card>
        </Theme>
    )
}