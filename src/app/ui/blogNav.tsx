import { fetchLatestPosts } from '../lib/data';
import { Card, Text, Flex } from "@radix-ui/themes";
import Link from 'next/link';
import { ShowTags } from '../ui/showTags'

export const BlogNav = async () => {
    const latestPosts = await fetchLatestPosts();
    return (
        <Flex direction="column" gap="4" mt="6">
            {latestPosts.map((post) => {
                post.tags = post.tags.slice(0, 2)
                return (
                    <Link href={`/post/${post.blogid}`} key={post.blogid} className="blog-card-link blog-card" style={{ cursor: 'pointer'}}>
                        <Card>
                            <Flex className="blog_container_main_flex" gap="1rem" style={{ padding: "0.5rem" }} width="100%">
                                <img className="blog_thumbnail" src={post.headerimage} alt="Blog Image" style={{ objectFit: "cover", borderRadius: "8px" }} />
                                <Flex direction="column" align="start" width="100%">
                                    <Flex mb="2" gap="2" direction="row" align="center">
                                        <Text className="blog-title-text" size="4" weight="medium" style={{ cursor: 'pointer', color: "var(--accent-a11)" }}>{post.blogtitle}</Text>
                                    </Flex>
                                    <Flex align="center" gap="5" direction="row">
                                        <Text>{`${post.blockcontent.slice(0, 80)}...`}</Text>
                                    </Flex>
                                    <Flex mt="4" gap="2" direction="row" width="100%" className="blog_card_details_container" justify="between" align="end">
                                        <Flex className="tools_container" gap="3" direction="row" align="center">
                                            <ShowTags tags={post.tags} />
                                        </Flex>
                                        <Text size="2" weight="light">{post.blogdate.toLocaleDateString()}</Text>
                                    </Flex>
                                    <Flex mt="4" className="tools_container_mobile" gap="3" direction="row" align="center">
                                        <ShowTags tags={post.tags} />
                                    </Flex>
                                </Flex>
                            </Flex>
                        </Card>
                    </Link>
                )
            })}
        </Flex>
    )
}