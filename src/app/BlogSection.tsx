import { Section, Flex, Text, Heading } from "@radix-ui/themes"
import { BlogPostCard } from "./ui/BlogPostCard"
import { Suspense } from "react"
import { getAllPosts } from '@/app/lib/posts';

export const BlogSection = () => {
    const posts = getAllPosts();


    return (
        <Suspense>
                    {
                        posts.map((post, i) => <BlogPostCard key={i} post={post}/>)
                    }
        </Suspense>

    )
}