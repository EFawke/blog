import { getAllSlugs, getPostBySlug } from '@/app/lib/posts';
import { Badge, Container } from '@radix-ui/themes';
import { notFound } from 'next/navigation';
import styles from './post.module.css';

export function generateStaticParams() {
  return getAllSlugs().map((slug: string) => ({ slug }));
}

export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  let post;
  try {
    post = await getPostBySlug(slug);
  } catch {
    notFound();
  }
  if (!post) notFound();

  return (
    <Container mt="6" mb="9" px={{ initial: '4', sm: '6' }}>
      <header className={styles.hero}>
        {post.backgroundImage && (
          <img className={styles.heroImage} src={post.backgroundImage} alt="" />
        )}
        <div className={styles.heroOverlay} />
        <div className={styles.heroContent}>
          {post.tags && post.tags.length > 0 && (
            <div className={styles.pills}>
              {post.tags.map((tag: string, i: number) => (
                <Badge size='2' key={tag} className={styles.pill}>{tag}</Badge>
                // <Badge size='2' key = {i}>{tag}</Badge>
              ))}
            </div>
          )}
          <h1 className={styles.heroTitle}>{post.title}</h1>
          <time className={styles.heroDate}>
            {new Date(post.date).toLocaleDateString()}
          </time>
        </div>
      </header>

      <article
        className={styles.content}
        dangerouslySetInnerHTML={{ __html: post.contentHtml }}
      />
    </Container>
  );
}