import { Flex, Text } from "@radix-ui/themes";
import { useState, useEffect, useMemo } from "react";

export default function HomeLink(
//     {
//     appearance,
// }: {
//     appearance: "light" | "dark";
// }
) {
    const [hovered, setHovered] = useState(false);

    useEffect(() => {
        [
            "/dark-idle.GIF",
            "/light-idle.GIF",
            "/dark-hover.GIF",
            "/light-hover.GIF",
        ].forEach((src) => {
            const i = new Image();
            i.src = src;
        });
    }, []);

    return (
        <Flex>
            <a
                href="/"
                onMouseEnter={() => setHovered(true)}
                onMouseLeave={() => setTimeout(() => setHovered(false), 500)}
                style={{
                    position: "relative",
                    height: "4rem",
                    width: "4rem",
                    overflow: "hidden",
                    borderRadius: "var(--radius-4)",
                    boxShadow: "0 0 0 1px var(--gray-a7)",
                }}
            >
                <span
                    className="logo-idle"
                    style={{ opacity: hovered ? 0 : 1 }}
                />
                <span
                    className="logo-hover"
                    style={{ opacity: hovered ? 1 : 0 }}
                />
            </a>
            {/* <div style={{ 
                background: 'white', 
                border: '2px solid gray', 
                padding: 'var(--space-1)', 
                width: '16rem',
                height: '5rem',
                borderRadius: '5rem',
                display: 'flex',
                alignItems: 'center'
            }}>
            <Text style={{color: 'black'}}>{text}</Text>
            </div> */}
        </Flex>
    );
}
