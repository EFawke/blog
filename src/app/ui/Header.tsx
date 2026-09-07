"use client"

import { PersonIcon, MoonIcon, SunIcon, HamburgerMenuIcon, Cross1Icon } from "@radix-ui/react-icons"
import { Flex, Text, Card, HoverCard, Link, Container, IconButton, Button } from "@radix-ui/themes";
import HomeLink from "./HomeLink";
import { logout } from "../actions/logout";
import { useState } from "react";

interface HeaderProps {
    loggedIn: boolean,
    username?: string,
    appearance: 'light' | 'dark',
    toggleAppearance: (appearance: 'light' | 'dark') => void,
}

const Header = ({ props }: { props: HeaderProps }) => {
    const [id, setId] = useState<'full_screen_mobile_menu' | 'mobile_closed'>('mobile_closed')

    const toggleId = (id: 'full_screen_mobile_menu' | 'mobile_closed') => {
        if (id === 'mobile_closed') {
            setId('full_screen_mobile_menu')
        } else {
            setId('mobile_closed')
        }
    }
    return (
        <>
            <Card style={{
                display: 'flex',
                justifyContent: 'space-between',
                flexDirection: 'column',
                position: 'sticky',
                zIndex: 50,
                top: '0'
            }}>
                <Container px={{ initial: '4', sm: '6' }}>
                    <Flex style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                        <HomeLink appearance={props.appearance} />
                        <Flex gap='5' align='center' id='desktop_navigation'>
                            <Link style={{ cursor: 'pointer' }} href="/#about"><Text>About</Text></Link>
                            <Link style={{ cursor: 'pointer' }} href="/#projects"><Text>Projects</Text></Link>
                            <Link style={{ cursor: 'pointer' }} href="/#blog"><Text>Blog</Text></Link>
                            <IconButton variant='outline' onClick={() => props.toggleAppearance(props.appearance)}>{props.appearance === 'dark' ? <SunIcon /> : <MoonIcon />}</IconButton>
                            <HoverCard.Root>
                                <HoverCard.Trigger>
                                    <Link href='/dashboard'>
                                        <IconButton variant={props.loggedIn ? 'solid' : 'outline'}>
                                            <PersonIcon />
                                        </IconButton>
                                    </Link>
                                </HoverCard.Trigger>
                                <HoverCard.Content maxWidth="300px">
                                    <Flex gap="4" direction="column">
                                        {props.loggedIn ? (
                                            <>
                                                {props.username && (
                                                    <Text size="2" color="gray">
                                                        Signed in as <Text weight="bold">{props.username}</Text>
                                                    </Text>
                                                )}
                                                <form action={logout}>
                                                    <Button variant='ghost' type="submit">Log out</Button>
                                                </form>
                                            </>
                                        ) : (
                                            <>
                                                <Link style={{ cursor: 'pointer' }} href="/signin">Sign in</Link>
                                                <Link style={{ cursor: 'pointer' }} href="/register">Register</Link>
                                            </>
                                        )}
                                    </Flex>
                                </HoverCard.Content>
                            </HoverCard.Root>
                        </Flex>
                        <Flex align='center' id='mobile_navigation'>
                            <IconButton variant='outline' onClick={() => toggleId(id)}>
                                {
                                    id === 'mobile_closed' ? <HamburgerMenuIcon width="24" height="24" /> : <Cross1Icon width="24" height="24" />
                                }
                            </IconButton>
                        </Flex>
                    </Flex>
                </Container>
            </Card>
            <div id={id} style={{ backgroundColor: props.appearance === 'light' ? '#FAF9F6' : 'var(--color-background)' }}>
                <Link style={{ cursor: 'pointer' }} href="/#about" onClick={() => toggleId(id)}><Text size='8'>About</Text></Link>
                <Link style={{ cursor: 'pointer' }} href="/#projects" onClick={() => toggleId(id)}><Text size='8'>Projects</Text></Link>
                <Link style={{ cursor: 'pointer' }} href="/#blog" onClick={() => toggleId(id)}><Text size='8'>Blog</Text></Link>
                {props.loggedIn ? (
                    <form action={logout}>
                        <Button variant='ghost' type="submit" onClick={() => toggleId(id)}><Text size='8'>Sign out</Text></Button>
                    </form>
                ) : (
                    <>
                        <Link style={{ cursor: 'pointer' }} href="/signin" onClick={() => toggleId(id)}><Text size='8'>Sign in</Text></Link>
                    </>
                )}
            </div>
        </>
    )
}

export default Header