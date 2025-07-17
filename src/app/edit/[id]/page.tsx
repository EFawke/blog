import { fetchPostById } from '@/app/lib/data';
import { notFound } from 'next/navigation';
import { BlogPost } from '@/app/ui/blogPost'

export async function Page(props: {params: Promise<{id: string}>}){
    const params = await props.params;
    const id = params.id;

    const [post] = await Promise.all([
        fetchPostById(id),
    ]);

    if (!post || post.length === 0) {
        notFound();
    }

    return (
        <main>
            <BlogPost post={post}/>
        </main>
    );
}