import postgres from 'postgres';
import {
  BlogPostRow,
  BlogPostRowWithType
} from './definitions';

const sql = postgres(process.env.POSTGRES_URL!);

export async function fetchLatestPosts() {
  try {
    const data = await sql<BlogPostRow[]>`
      SELECT
      headerimage,
      tags,
      blockorder,
      islive,
      blogdate,
      blogid,
      blockcontent,
      blogtitle
  FROM blog
  WHERE blockorder = 0 AND islive = 'true'
  ORDER BY blogdate DESC;`;

    return data;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch the latest invoices.');
  }
}

export async function fetchPostById(id: string) {
  try {
    const data = await sql<BlogPostRowWithType[]>`
      SELECT
          headerimage,
          tags,
          blockorder,
          islive,
          blogdate,
          blogid,
          blockcontent,
          blogtitle,
          blocktype
      FROM blog
      WHERE blogid = ${id}
      ORDER BY blockorder;
      `;

    return data;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch invoice.');
  }
}