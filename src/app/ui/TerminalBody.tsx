"use client";

import { Text } from "@radix-ui/themes";
import { useEffect, useState } from "react";

export const TerminalBody = ({ tech }: { tech: string }) => {
    const [text, setText] = useState(tech);

    useEffect(() => {
        setText(tech);
    }, [tech])

    return (
        <Text>{text}</Text>
    )
};