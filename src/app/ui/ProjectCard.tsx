import { ArrowTopRightIcon } from "@radix-ui/react-icons";
import { Card, Flex, Text, Heading, Badge, Link, Theme, Button, IconButton } from "@radix-ui/themes";
// import { PostMeta } from "@/app/lib/posts"
interface ProjecMeta {
    title: string;
    stack: string[];
    description: string;
    links: {
        title: string;
        href: string;
    }[];
    image: string;
}

export const ProjectCard = ({ project, index }: { project: ProjecMeta, index: number }) => {
    const src = project.image;
    const title = project.title;

    return (
        <Theme radius='medium' className='blog_post_card' key={index}
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
                    boxShadow: 'var(--shadow-6)'
                }}>
                <Flex justify='end' direction='column' gap='2' className='blog_post_card'
                    style={{
                        borderRadius: 'var(--radius-6)',
                        width: '100%',
                    }}
                >
                    <Flex pb='4' pl='4' wrap='wrap' className='blog_theme_container'>
                        <Theme 
                        className='blog_card_theme'
                        radius='small' style={{ background: 'transparent' }}>
                            <Flex direction='column' gap='2' style={{ width: '100%' }} wrap='wrap'>
                                <Flex gap='2' className='blog_link_container' wrap='wrap'>
                                    <Link href={project?.links[0].href}><Heading highContrast className='card_font_legible' size='4'>{title}</Heading></Link>
                                    <ArrowTopRightIcon color='var(--accent-9)' className='card_pointer'></ArrowTopRightIcon>
                                </Flex>
                                <Flex gap='2' justify='between' direction='column' wrap='wrap'>
                                    <Text highContrast size='2' className='card_font_legible'>{project.description}</Text>
                                    <Flex gap='2' wrap='wrap'>
                                        {
                                            project.stack?.slice(0,3).map((tag, i) => <div className='homepage_badges_container' key={i}><Badge highContrast>{tag}</Badge></div>)
                                        }
                                    </Flex>
                                </Flex>
                            </Flex>
                        </Theme>
                    </Flex>
                </Flex>
            </Flex>
        </Theme>
    )
};