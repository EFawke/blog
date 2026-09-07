"use client"

import React, { useState, useEffect } from 'react'
import Cookies from 'js-cookie'
import { Theme } from '@radix-ui/themes'
import Header from "./ui/Header";
import { logout } from './actions/logout';

type Appearance = 'light' | 'dark'

export default function ThemeProvider({
    children,
    loggedIn,
    username,
    initialAppearance, // from the cookie, read on the server
}: {
    children: React.ReactNode
    loggedIn: boolean
    username?: string
    initialAppearance?: Appearance
}) {
    const [appearance, setAppearance] = useState<Appearance>(initialAppearance ?? 'dark')

    // No saved choice yet → fall back to the user's OS/browser preference.
    useEffect(() => {
        if (initialAppearance) return // already have a saved preference, leave it
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
        setAppearance(prefersDark ? 'dark' : 'light')
    }, [initialAppearance])

    const toggleAppearance = (current: Appearance) => {
        const next: Appearance = current === 'light' ? 'dark' : 'light'
        setAppearance(next)
        Cookies.set('appearance', next, { expires: 365, sameSite: 'lax', path: '/' })
    }

    const props = { loggedIn, username, appearance, toggleAppearance }

    let windowHeight: number = 0;
    if (typeof window !== 'undefined') {
        windowHeight = window?.innerHeight;
    }

    return (
        <Theme
            accentColor='blue'
            panelBackground='solid'
            radius='large'
            scaling={windowHeight > 710 ? '110%' : '100%'}
            appearance={appearance}
            style={{ backgroundColor: appearance === 'light' ? '#FAF9F6' : 'unset' }}
        >
            <Header props={props} />
            {children}
        </Theme>
    )
}