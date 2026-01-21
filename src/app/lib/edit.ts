import postgres from 'postgres';
import {
  BlogPostRow,
  BlogPostRowWithType
} from './definitions';

const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });

export type BlogBlock = {
    blocktype: string;
    blockcontent: string;
    blockorder: number;
};

export function writeQuery(elements: BlogBlock[], title: string, id: number, tags: string[], headerImage: string, date: any){
    let query = `INSERT INTO blog (headerimage, tags, blockorder, islive, blogdate, blogid, blockcontent, blogtitle, blocktype) VALUES`
    const params = [];
    let paramIndex = 1;
    for (let i = 0; i < elements.length; i++) {
        const el = elements[i];
        params.push(
            headerImage,
            JSON.stringify(tags),
            el.blockorder,
            true,
            date ? date : new Date(),
            id,
            el.blockcontent,
            title,
            el.blocktype,
        );
    }
    query += values.join(', ')
    return query;
};

export async function deletePost(id: string) {
    try {
      const data = await sql<BlogPostRowWithType[]>`
      DELETE
      FROM blog
      WHERE blogid = ${id};`;
  
      return data;
    } catch (error) {
      console.error('Database Error:', error);
      throw new Error('Failed to delete blog post.');
    }
}

export async function createPost(reqBody: any, client: Client, id: number) {
    try {
        const title = reqBody.title;
        const elements = reqBody.elements;
        const tags = reqBody.tags;
        const headerImage = reqBody.headerImage
    
        if (elements.length == 0 || title == "") {
            throw new Error("No Elements Added");
        }
    
        const { query, params } = writeQuery(elements, title, id, tags, headerImage, null);
    
        try {
            const data = await sql<BlogPostRowWithType[]>(query);
            return data;
        }
        catch (err) {
            throw new Error("Something went wrong!");
        }
    } catch (error) {
      console.error('Database Error:', error);
      throw new Error('Failed to delete blog post.');
    }
}


blogRouter.post('/create', async (req, res) => {
    const idResult = await client.query('SELECT MAX(blogId) as max FROM blog');
    const id = idResult.rows[0].max ? Number(idResult.rows[0].max) + 1 : 1;
    try {
        await createPost(req.body, client, id)
        res.status(200).send({id: id});
    }
    catch (err) {
        res.status(500).send(err);
    }
})

blogRouter.post('/edit', async (req, res) => {
    try {
        const id = await editPost(req.body, client)
        res.status(200).send({id: id});
    }
    catch (err) {
        res.status(500).send(err);
    }
})

module.exports = blogRouter;