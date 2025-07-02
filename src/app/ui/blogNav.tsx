// import { fetchLatestPosts } from '../lib/data';
// import { Card, Text, Flex, Badge } from "@radix-ui/themes";
// import Link from 'next/link';
// import Image from 'next/image';

export const BlogNav = async () => {
    return (
        <div></div>
    )
    // const latestPosts = await fetchLatestPosts();
    // return (
    //     <Flex direction="column" gap="4" mt="6">
    //         {latestPosts.map((post) => {
    //             post.tags = post.tags.slice(0,2)
    //             // const tags = post.tags
    //             return (
    //                 <Card key={post.blogid}>
    //                     <Flex className="blog_container_main_flex" gap="1rem" style={{ padding: "0.5rem" }} width="100%">
    //                         <img className="blog_thumbnail" src={post.headerimage} alt="Blog Image" style={{ objectFit: "cover", borderRadius: "8px" }} />
    //                         <Flex direction="column" align="start" width="100%">
    //                             <Flex mb="2" gap="2" direction="row" align="center">
    //                                 <Link href={`/post/${post.blogid}`}><Text size="4" weight="medium" className="blog-card-link" style={{ cursor: 'pointer', color: "var(--accent-a11)" }}>{post.blogtitle}</Text></Link>
    //                             </Flex>
    //                             <Flex align="center" gap="5" direction="row">
    //                                 <Text>{`${post.blockcontent.slice(0, 80)}...`}</Text>
    //                             </Flex>
    //                             <Flex mt="4" gap="2" direction="row" width="100%" className="blog_card_details_container" justify="between" align="end">
    //                                 <Flex className="tools_container" gap="3" direction="row" align="center">
    //                                     {post.tags.map((tag:string) => {
    //                                         return (
    //                                             <Badge key={tag} variant="soft" size="2" color="blue">
    //                                                 {tag}
    //                                             </Badge>
    //                                         )
    //                                     })}
    //                                 </Flex>
    //                                 <Text size="2" weight="light">{post.blogdate.toLocaleDateString()}</Text>
    //                             </Flex>
    //                             <Flex mt="4" className="tools_container_mobile" gap="3" direction="row" align="center">
    //                                 {post.tags.map((tag:string) => {
    //                                     return (
    //                                         <Badge key={tag} variant="soft" size="2" color="blue">
    //                                             {tag}
    //                                         </Badge>
    //                                     )
    //                                 })}
    //                             </Flex>
    //                         </Flex>
    //                     </Flex>
    //                 </Card>
    //             )
    //         })}
    //     </Flex>
    // )
}