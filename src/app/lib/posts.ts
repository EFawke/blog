import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';

const postsDirectory = path.join(process.cwd(), 'posts');

export type PostMeta = {
  slug: string;
  title: string;
  date: string;
  excerpt?: string;
  tags?: string[];
  length: string;
  backgroundImage: string;
};

// List all posts (metadata only), newest first — for the index page
export function getAllPosts(): PostMeta[] {
  const files = fs.readdirSync(postsDirectory);

  return files
    .filter((file) => file.endsWith('.md'))
    .map((file) => {
      const slug = file.replace(/\.md$/, '');
      const fullPath = path.join(postsDirectory, file);
      const fileContents = fs.readFileSync(fullPath, 'utf8');
      const { data } = matter(fileContents);

      return {
        slug,
        title: data.title,
        date: data.date,
        excerpt: data.excerpt,
        tags: data.tags,
        length: data.length,
        backgroundImage: data.backgroundImage
      };
    })
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

// Full post (metadata + rendered HTML) — for a single post page
export async function getPostBySlug(slug: string) {
  const fullPath = path.join(postsDirectory, `${slug}.md`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const { data, content } = matter(fileContents);

  const processed = await remark().use(html).process(content);
  const contentHtml = processed.toString();

  return {
    slug,
    contentHtml,
    title: data.title,
    date: data.date,
    tags: data.tags,
    length: data.length,
    backgroundImage: data.backgroundImage
  };
}

// Just the slugs — feeds generateStaticParams
export function getAllSlugs(): string[] {
  return fs
    .readdirSync(postsDirectory)
    .filter((file) => file.endsWith('.md'))
    .map((file) => file.replace(/\.md$/, ''));
}