"use client"

import { ArrowTopRightIcon } from "@radix-ui/react-icons";
import { Card, Flex, Text, Heading, Badge, Link, Theme, Button, IconButton } from "@radix-ui/themes";
import { PostMeta } from "@/app/lib/posts"

export const BlogPostCard = ({ key, post }: { key: number, post: PostMeta }) => {
    const src = post.backgroundImage;
    const title = post.title;

    return (
        <Theme radius='medium' className='blog_post_card' key={key}
            style={{ borderRadius: 'var(--radius-6)', marginBottom: 'var(--space-4)' }}
        >
            <Flex
                className='blog_post_card'
                style={{
                    backgroundImage: `url(${src})`,
                    minHeight: `8rem`,
                    backgroundSize: 'cover',
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'center',
                    borderRadius: 'var(--radius-6)',
                    boxShadow: 'var(--shadow-3)'
                }}>
                <Flex wrap='wrap' justify='end' direction='column' gap='2' className='blog_post_card'
                    style={{
                        borderRadius: 'var(--radius-6)',
                        width: '100%',
                    }}
                >
                    <Flex className='blog_theme_container' wrap='wrap'>
                        <Theme className='blog_card_theme' radius='small' style={{ background: 'transparent' }}>
                            <Flex direction='column' gap='2' style={{ width: '100%' }} wrap='wrap'>
                                <Flex gap='2' className='blog_link_container' wrap='wrap'>
                                    <Link href={`/blog/${post.slug}`}><Heading highContrast size='4' className='card_font_legible'>{title}</Heading></Link>
                                    <ArrowTopRightIcon color='var(--accent-9)' className='card_pointer'></ArrowTopRightIcon>
                                </Flex>
                                <Flex gap='2' justify='between' wrap='wrap' className='post_data'>
                                    <Text highContrast size='2' className='card_font_legible' wrap='wrap'>{post.length}</Text>
                                    <Flex gap='2' wrap='wrap'>
                                        {
                                            post.tags?.slice(0,3).map((tag, i) => <Badge highContrast style={{opacity: 1}} key={i}>{tag}</Badge>)
                                        }
                                    </Flex>
                                    <Text highContrast className='card_font_legible' size='2'>{new Date(post.date).toLocaleDateString()}</Text>
                                </Flex>
                            </Flex>
                        </Theme>
                    </Flex>
                </Flex>
            </Flex>
        </Theme>
    )
};