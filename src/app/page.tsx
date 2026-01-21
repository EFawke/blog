import { Container, Flex, Section, Heading } from "@radix-ui/themes";
import { Links } from "./ui/links"
import { BlogNav } from "./ui/blogNav"
import { Suspense } from 'react';
import { BlogNavSkeleton } from './ui/skeletons';
import { AdminOnly } from "./ui/components/AdminOnly";
import Link from "next/link";

export default function Home() {
  return (
    <Container size="4">
      <AdminOnly>
          <Link style={{fontSize: '2rem', textAlign: 'center', padding: '1rem', position: 'absolute', left: 0, zIndex:'900', top: 0, background: 'var(--accent-a11)'}} href={"/admin"}>Go to admin dashboard</Link>
      </AdminOnly>
      <Flex gap="4" direction="row" justify="between" id="weird_flex_bro">
        <Section id="left_page" top="0">
          <Flex justify="between" height="100%" direction="column">
            <Flex gap="4" direction="column">
              <Heading mt="6" size="9">Ted Fawke</Heading>
              <Heading weight="medium" size="6">Some words about coding</Heading>
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
