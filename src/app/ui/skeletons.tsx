import { Flex, Skeleton, Card } from "@radix-ui/themes";

export function BlogCardSkeleton() {
  return (
    <Card>
      <Flex className="blog_container_main_flex" gap="1rem" style={{ padding: "0.5rem" }} width="100%">
        <Skeleton className="blog_thumbnail" height="122px" width="158px" style={{ borderRadius: "8px" }}></Skeleton>
        <Flex direction="column" align="start" gap="4">
          <Flex mb="2" gap="2" direction="row" align="center">
            <Skeleton width="200px" height="20px"></Skeleton>
          </Flex>
          <Flex align="start" gap="1" direction="column">
            <Skeleton width="350px" height="20px"></Skeleton>
            <Skeleton width="300px" height="20px"></Skeleton>
          </Flex>
          <Flex gap="2" direction="row" width="100%" className="blog_card_details_container" justify="between" align="end">
            <Flex className="tools_container" gap="3" direction="row" align="center">
              <Skeleton width="60px" height="20px"></Skeleton> <Skeleton width="60px" height="20px"></Skeleton>
            </Flex>
            <Skeleton width="60px" height="20px"></Skeleton>
          </Flex>
          <Flex className="tools_container_mobile" gap="3" direction="row" align="center">
            <Skeleton width="60px" height="20px"></Skeleton> <Skeleton width="60px" height="20px"></Skeleton>
          </Flex>
        </Flex>
      </Flex>
    </Card>
  );
}

export function BlogNavSkeleton() {
  return (
    <Flex direction="column" gap="4">
      <BlogCardSkeleton />
      <BlogCardSkeleton />
      <BlogCardSkeleton />
    </Flex>
  )
}