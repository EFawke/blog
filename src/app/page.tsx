import {
  Container,
  Flex,
  Heading,
  Text,
  Section,
  Link,
} from "@radix-ui/themes";
import { Links } from "./ui/links";
import Landscape from "./landscape/Landscape";
import { CelebrationProvider } from "./celebration/CelebrationContext";
import { RevealLayer } from "./celebration/RevealLayer";
import { ContactButton } from "./celebration/ContactButton";
import { BlogSection } from "./BlogSection";
import { ProjectCard } from "./ui/ProjectCard";
// import { Flex, Link } from "@radix-ui/themes";
import {
  GitHubLogoIcon,
  LinkedInLogoIcon,
  EnvelopeClosedIcon,
} from "@radix-ui/react-icons";
import { Terminal } from "./ui/Terminal";

const projects = [
  {
    title: "Ted Fawke.com",
    stack: ["Next.js", "TypeScript", "SQL", "Radix"],
    description: "Personal dev blog, auth, CMS, you are here.",
    links: [
      { title: "github", href: "https://github.com/EFawke/blog" },
      { title: "site", href: "/" },
    ],
    image:
      "https://res.cloudinary.com/dlkofkgto/image/upload/v1788804476/dev_blog/mjidjy80ohloxwmlo1nl.png",
  },
  {
    title: "Quick Update",
    stack: ["Remix", "TypeScript", "GraphQL", "Shopify", "Polaris"],
    description:
      "Merchant facing Shopify App for managing products.",
    links: [
      { title: "github", href: "https://github.com/EFawke/quick-update" },
    ],
    image:
      "https://res.cloudinary.com/dlkofkgto/image/upload/v1788807927/dev_blog/bbdpfzogmg6ngrlxv9bw.png",
  },
  {
    title: "Eve Subsystem Analysis",
    stack: ["Node.js", "React.js", "Radix", "Express", "SQL"],
    description:
      "Data visualisation and production planning tool for Eve Online.",
    links: [
      {
        title: "github",
        href: "https://github.com/EFawke/EveSubsystemAnalysis",
      },
      { title: "site", href: "https://evesubsystemanalysis.com/" },
    ],
    image:
      "https://res.cloudinary.com/dlkofkgto/image/upload/v1788799258/dev_blog/at4jk0qit6sy7mylf0vo.png",
  },
];

export default function Home() {
  return (
    <CelebrationProvider>
      <RevealLayer>
        <Landscape />
      </RevealLayer>
      <Container px={{initial: '4', sm: '6'}}>
        <Flex gap="1" id="weird_flex_bro">
          <Section id="left_page" pt="9" pb="9" 
          // pr="9"
          >
            <Flex
              justify="between"
              direction="column"
              // pr="9"
              style={{
                height: "100%",
                // maxHeight: '32rem' // larger screens the negative space gets too much
              }}
            >
              <Flex direction="column" gap="2">
                <Heading style={{ fontSize: "6rem", lineHeight: "1", maxWidth: '450px' }}>
                  Ted Fawke
                </Heading>
                <Heading size="6" color="gray" weight="medium">
                  Full-stack web developer
                </Heading>
              </Flex>
              <Terminal/>
              <Flex gap="5" direction="row" align='center'>
                <ContactButton />
                <Link href="mailto:teduardof@gmail.com">
                  <EnvelopeClosedIcon
                    height="20"
                    width="20"
                    className="socials"
                  />
                </Link>
                <Link href="https://github.com/EFawke">
                  <GitHubLogoIcon height="20" width="20" className="socials" />
                </Link>
                <Link href="https://www.linkedin.com/in/ted-fawke-34b658231/">
                  <LinkedInLogoIcon
                    height="20"
                    width="20"
                    className="socials"
                  />
                </Link>
              </Flex>
            </Flex>
          </Section>
          <Flex 
          // id="right_page" 
          direction="column">
            <Section 
            // className="homepage_section" 
            id="about"
            
            >
              <Flex
                justify="start"
                direction="column"
                // className="homepage_section_right_content"
              >
                <Flex direction="column" gap="3">
                  <Heading color="gray" size="3" mt="3" weight="bold">
                    About Me
                  </Heading>
                  <Text color="amber" size="4" mb="4" as="div">
                    Greetings, traveller.
                  </Text>
                </Flex>
                <Text
                  style={{
                    textAlign: "justify",
                    textJustify: "inter-character",
                  }}
                  size="3"
                  mb="2"
                  as="div"
                >
                  I'm a full-stack web developer with 5 years of commercial experience building and maintaining e-commerce sites at an agency where downtime cost real money. Day to day that meant WordPress and PHP, plus a good deal of Remix and React with TypeScript.
                </Text>
                <Text
                  style={{
                    // textAlign: "justify",
                    // textJustify: "inter-character",
                  }}
                  size="3"
                  mb="2"
                  as="div"
                >
                  Owning projects end-to-end taught me that a sensible design grounded in the user's real problem usually beats a clever one you have to explain.
                </Text>
                {/* <Text
                  style={{
                    // textAlign: "justify",
                    // textJustify: "inter-character",
                  }}
                  size="4"
                  mb="2"
                  as="div"
                >
                  Owning projects end-to-end taught me that a sensible design grounded in the user's real problem usually beats a clever one you have to explain.


                </Text> */}
              </Flex>
            </Section>
            <Section 
            // className="homepage_section" 
            id="projects"
            // pb='0'
            
            >
              <Flex
                justify="start"
                direction="column"
                // className="homepage_section_right_content"
              >
                <Flex direction="column" gap="1" mb="4">
                  <Heading color='gray' size="3"
                  //  mt="3" 
                   weight="bold">
                    Projects
                  </Heading>
                  {/* <Text color="gray" size="4" mb="3" as="div">
                    Works I've finished recently and am proud of.
                  </Text> */}
                </Flex>
                {projects.map((project, i) => (
                  <ProjectCard key={i} project={project} index={i} />
                ))}
              </Flex>
            </Section>
            <Section 
                        // pb='0'

            // className="homepage_section" 
            id="blog">
              <Flex
                justify="start"
                direction="column"
                className="homepage_section_right_content"
              >
                <Flex direction="column" gap="1" mb="4">
                  <Heading color='gray' size="3" mt="3" weight="bold">
                    Blog
                  </Heading>
                  {/* <Text color="gray" size="4" mb="3" as="div">
                    The Industrial Revolution and its consequences.
                  </Text> */}
                </Flex>
                <BlogSection />
              </Flex>
            </Section>
          </Flex>
        </Flex>
      </Container>
    </CelebrationProvider>
  );
}
