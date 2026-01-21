import { fetchLatestPosts } from '../lib/data';
import { Card, Text, Flex, Button } from "@radix-ui/themes";
import Link from "next/link";

export const BlogNavAdmin = async () => {
    const latestPosts = await fetchLatestPosts();
    return (
        <Flex direction="column" gap="4" mt="6">
            {latestPosts.map((post) => {
                return (
                    <Card key={post.blogid}>
                        <Flex className="blog_container_main_flex" gap="1rem" style={{ padding: "0.5rem" }}>
                            <Flex mb="2" gap="2" direction="row" align="center">
                                <Text size="4" weight="medium">{post.blogtitle}</Text>
                                <Link href={`/edit/${post.blogid}`}>Edit</Link>
                            </Flex>
                        </Flex>
                    </Card>
                )
            })}
        </Flex>
    )
}