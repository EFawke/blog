import Link from 'next/link';
import { getAllPosts } from '@/app/lib/posts';

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <main>
      <h1>Blog</h1>
      <ul>
        {posts.map((post) => (
          <li key={post.slug}>
            <Link href={`/blog/${post.slug}`}>{post.title}</Link>
            <time>{post.date}</time>
            <p>{post.length}</p>
            {post.excerpt && <p>{post.excerpt}</p>}
          </li>
        ))}
      </ul>
    </main>
  );
}