"use client"

import React, { useState, useEffect } from 'react'
import Cookies from 'js-cookie'
import { Theme } from '@radix-ui/themes'
import Header from "./ui/Header";

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
    useEffect(() => {
        if (initialAppearance) return
        const domAppearance = document.documentElement.classList.contains('dark') ? 'dark' : 'light'
        setAppearance(domAppearance)
    }, [initialAppearance])

    const toggleAppearance = (current: Appearance) => {
        const next: Appearance = current === 'light' ? 'dark' : 'light'
        const d = document.documentElement
        d.classList.remove('light', 'dark')
        d.classList.add(next)
        d.style.colorScheme = next
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
        >
            <Header props={props} />
            {children}
        </Theme>
    )
}