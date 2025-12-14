"use client";

import { BlogPostRowWithType } from "@/app/lib/definitions";
import { Heading, Container, Flex, Badge } from "@radix-ui/themes";
import ReactMarkdown from "react-markdown";
import Link from "next/link";
import { ScheduleDemoOptimized } from "./components/scheduleDemo/ScheduleDemoOptimized";
import { useEffect, useState } from "react";

export function BlogPost({ post }: { post: BlogPostRowWithType[] }) {
    const [showHeader, setShowHeader] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            const currentY = window.scrollY;
            if (currentY > lastScrollY && currentY > 50) {
                setShowHeader(false);
            } else {
                setShowHeader(true);
            }
            setLastScrollY(currentY);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, [lastScrollY]);

    return (
        <Container size="3" className="blog-container">
            <div
                style={{
                    position: "fixed",
                    top: showHeader ? 0 : "-80px", // slide out when hidden
                    left: 0,
                    width: "100%",
                    zIndex: 999,
                    background: "black",
                    transition: "top 0.3s ease",
                }}
            >
                <Container size="3" className="blog-container">
                    <Flex
                        gap="4"
                        pt="4"
                        pb="4"
                        mb="5"
                        mt="5"
                        direction="row"
                        justify="between"
                        id="header"
                    >
                        <Link
                            href="/"
                            className="go_back_link"
                            style={{
                                cursor: "pointer",
                                color: "var(--accent-a11)",
                                fontSize: "var(--font-size-6)",
                            }}
                        >
                            Go back
                        </Link>
                    </Flex>
                </Container>
            </div>

            <Flex direction="column" gap="4" style={{ paddingTop: "8rem" }}>
                {post[0].headerimage && (
                    <img
                        src={post[0].headerimage}
                        alt="Header"
                        style={{
                            objectFit: "cover",
                            objectPosition: "top",
                            borderRadius: "var(--radius-3)",
                            maxHeight: "360px",
                        }}
                    />
                )}

                <Heading size="9" weight="bold" mb="4">
                    {post[0].blogtitle}
                </Heading>

                {post[0].tags.length > 0 && (
                    <Flex gap="2" wrap="wrap" mb="4">
                        {post[0].tags.map((tag: string, index: number) => (
                            <Badge key={index} variant="soft" size="2" color="blue">
                                {tag}
                            </Badge>
                        ))}
                    </Flex>
                )}

                <Flex direction="column" mb="9" pb="9">
                    {post.map((element: BlogPostRowWithType) => (
                        <div key={element.blockorder}>
                            {element.blocktype === "text" && (
                                <div className="blog-content">
                                    <ReactMarkdown>{element.blockcontent}</ReactMarkdown>
                                </div>
                            )}

                            {element.blocktype === "image" && (
                                <div className="blog-content">
                                    <img
                                        src={element.blockcontent}
                                        alt="Blog content"
                                        style={{
                                            objectFit: "contain",
                                            width: "100%",
                                            height: "100%",
                                            borderRadius: "var(--radius-3)",
                                        }}
                                    />
                                </div>
                            )}

                            {element.blocktype === "component" &&
                                (() => {
                                    switch (element.blockcontent) {
                                        case "ScheduleDemoOptimized":
                                            return (
                                                <div className = "blog-content">
                                                    <ScheduleDemoOptimized />
                                                </div>
                                            )
                                        default:
                                            return null;
                                    }
                                })()}
                        </div>
                    ))}
                </Flex>
            </Flex>
        </Container>
    );
}
