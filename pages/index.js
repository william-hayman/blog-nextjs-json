import Link from 'next/link';
import client from '../lib/contentful';

export async function getStaticProps() {
    const entries = await client.getEntries({
        content_type: 'blogPost',
    });

    return {
        props: {
            posts: entries.items,
        },
    };
}

export default function Home({ posts }) {
    return (
        <div>
            <h1>Blog Posts</h1>
            {posts.map((post) => (
                <div key={post.sys.id}>
                    <Link href={`/blog/${post.fields.slug}`} legacyBehavior>
                        <a>
                            <h2>{post.fields.title}</h2>
                        </a>
                    </Link>
                </div>
            ))}
        </div>
    );
}
