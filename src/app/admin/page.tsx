import { Container, Flex, Section, Heading } from "@radix-ui/themes";
import { BlogNavAdmin } from "../ui/blogNavAdmin";

export default function Admin() {
  return (
    <Container size="4">
        <Heading>Hey admin ;)</Heading>
        <BlogNavAdmin/>
    </Container>
  );
}
