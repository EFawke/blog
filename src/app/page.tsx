import { Container, Flex, Section, Heading, HoverCard } from "@radix-ui/themes";
import { Links } from "./ui/links"
import { BlogNav } from "./ui/blogNav"
import { Suspense } from 'react';
import { BlogNavSkeleton } from './ui/skeletons';
import Image from 'next/image';

export default function Home() {
  return (
    <Container size="4">
      <Flex gap="4" direction="row" justify="between" id="weird_flex_bro">
        <Section id="left_page" top="0">
          <Flex justify="between" height="100%" direction="column">
            <Flex gap="4" direction="column">
              <Heading mt="6" size="9">Ted Fawke</Heading>
              <Heading weight="medium" size="6">Some words about coding</Heading>
              <Flex gap="4" direction="row" align="end">
              
              <Image
                src="/reading.png" // this references /public/projects.png
                alt="Projects"
                width={240}         // specify width
                height={240}        // and height
              />
              {/* <Heading weight="medium" size="6">Recent Posts</Heading> */}
              </Flex>
            </Flex>
            <Links />
          </Flex>
        </Section>
        <Section id="right_page">
          <Flex gap="4" direction="column">
            <Suspense fallback={<BlogNavSkeleton />}>
              <BlogNav />
            </Suspense>
          </Flex>
        </Section>
      </Flex>
    </Container>
  );
}
