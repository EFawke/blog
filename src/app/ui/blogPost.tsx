import { BlogPostRowWithType } from "@/app/lib/definitions"
import { Heading, Container, Flex, Badge } from "@radix-ui/themes";
import ReactMarkdown from 'react-markdown';
import Link from 'next/link';
// import Image from 'next/image';

export function BlogPost({ post }: { post: BlogPostRowWithType[] }) {
    return (
        <Container size="3" className="blog-container">
            <Flex gap="4" pt="4" pb="4" mb="5" mt="5" direction="row" justify="between" id="header">
                <Link href="/" className = "go_back_link" style={{cursor: 'pointer', color: "var(--accent-a11)", fontSize: "var(--font-size-6)" }}>Go back</Link>
            </Flex>

            <Flex direction="column" gap="4">                
                {post[0].headerimage && (
                    <img
                        src={post[0].headerimage}
                        alt="Header"
                        style={{
                            objectFit: "cover",
                            objectPosition: "top",
                            borderRadius: 'var(--radius-3)',
                            maxHeight: '360px'
                        }}
                    />
                )}
                <Heading size="9" weight="bold" mb="4">{post[0].blogtitle}</Heading>
                {post[0].tags.length > 0 && (
                    <Flex gap="2" wrap="wrap" mb="4">
                        {post[0].tags.map((tag: string, index: number) => (
                            <Badge key={index} variant="soft" size="2" color="blue">
                                {tag}
                            </Badge>
                        ))}
                    </Flex>
                )}
                <Flex direction="column" gap="6" mb="9" pb="9">
                    {post.map((element: BlogPostRowWithType) => (
                        <div key={element.blockorder}>
                            {element.blocktype === 'text' && (
                                <div className="blog-content">
                                    <ReactMarkdown>
                                        {element.blockcontent}
                                    </ReactMarkdown>
                                </div>
                            )}

                            {element.blocktype === 'image' && (
                                <img
                                    src={element.blockcontent}
                                    alt="Blog content"
                                    style={{
                                        objectFit: 'contain',
                                        width: '100%',
                                        height: '100%',
                                        borderRadius: 'var(--radius-3)'
                                    }}
                                />
                            )}
                        </div>
                    ))}
                </Flex>
            </Flex>
        </Container>
    )
}