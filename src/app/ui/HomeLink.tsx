import React from 'react'
import { useState, useEffect } from 'react'

export default function HomeLink({ appearance }: { appearance: 'light' | 'dark' }) {
    const [hovered, setHovered] = useState(false)

    useEffect(() => {
        ['/dark-idle.GIF', '/light-idle.GIF', '/dark-hover.GIF', '/light-hover.GIF']
            .forEach((src) => { const i = new Image(); i.src = src; });
    }, []);

    return (
        <a
            href="/"
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setTimeout(() => setHovered(false), 500)}
            style={{
                position: 'relative',
                height: '4rem',
                width: '4rem',
                overflow: 'hidden',
                borderRadius: 'var(--radius-4)',
                boxShadow: '0 0 0 1px var(--gray-a7)',
            }}
        >
            <span style={{
                position: 'absolute',
                inset: 0,
                backgroundImage: appearance == 'dark' ? 'url(/dark-idle.GIF)' : 'url(/light-idle.GIF)',
                backgroundSize: '6rem',
                backgroundPosition: 'center top',
                backgroundRepeat: 'no-repeat',
                opacity: hovered ? 0 : 1,
            }} />
            <span style={{
                position: 'absolute', inset: 0,
                backgroundImage: appearance == 'dark' ? 'url(/dark-hover.GIF)' : 'url(/light-hover.GIF)',
                backgroundSize: '6rem', backgroundPosition: 'center top', backgroundRepeat: 'no-repeat',
                opacity: hovered ? 1 : 0,
            }} />
        </a>
    )
}