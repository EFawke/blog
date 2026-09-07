"use client"

import { useState } from "react"
import { Flex, Text, TextField } from "@radix-ui/themes"

export const ImagesTable = ({ data }: { data: any[] }) => {
    return (
        <Flex gap="4" wrap="wrap">
            {data.map((img: { src: string; alt?: string }, i) => (
                <ImageCell key={i} img={img} />
            ))}
        </Flex>
    )
}

const ImageCell = ({ img }: { img: { src: string; alt?: string } }) => {
    const [copied, setCopied] = useState(false)

    const handleCopy = async (e: React.MouseEvent<HTMLInputElement>) => {
        e.currentTarget.select() // fallback + visual feedback
        try {
            await navigator.clipboard.writeText(img.src)
            setCopied(true)
            setTimeout(() => setCopied(false), 1500)
        } catch {
            // clipboard API unavailable (e.g. non-HTTPS); the select() above
            // still lets the user copy manually
        }
    }

    return (
        <Flex direction="column" gap="1" style={{ width: "12rem" }}>
            <img
                style={{ width: "6rem", height: "6rem", objectFit: "cover" }}
                src={img.src}
                alt={img.alt ?? ""}
            />
            <TextField.Root
                size="1"
                value={img.src}
                readOnly
                onClick={handleCopy}
                style={{ cursor: "pointer" }}
            />
            <Text size="1" color="gray" style={{ height: "1rem" }}>
                {copied ? "Copied!" : ""}
            </Text>
        </Flex>
    )
}