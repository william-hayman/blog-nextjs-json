import { useRouter } from 'next/router';
import posts from '../../data/posts.json';

export default function Post() {
    const router = useRouter();
    const { slug } = router.query;

    const post = posts.find(({ blog }) => blog.slug === slug);

    if (!post) {
        return <p>Carregando...</p>;
    }

    return (
        <div>
            <h1>{post.blog.name}</h1>
            <p>Por {post.blog.author} - {new Date(post.blog.date).toLocaleDateString()}</p>
            <img src={post.blog.image} alt={post.blog.name} width="400" />
            <div dangerouslySetInnerHTML={{ __html: post.blog.content.html }} />
        </div>
    );
}
