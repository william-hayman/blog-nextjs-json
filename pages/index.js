import Link from 'next/link';
import posts from '../data/posts.json';

export default function Home() {
  return (
      <div>
        <h1>Blog</h1>
        <ul>
          {posts.map(({ blog }) => (
              <li key={blog.slug}>
                <Link href={`/post/${blog.slug}`} legacyBehavior>
                  <a>
                    <img src={blog.image} alt={blog.name} width="200" />
                    <h2>{blog.name}</h2>
                    <p>Por {blog.author} - {new Date(blog.date).toLocaleDateString()}</p>
                  </a>
                </Link>
              </li>
          ))}
        </ul>
      </div>
  );
}