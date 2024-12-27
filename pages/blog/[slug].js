import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import client from '@/lib/contentful';

const getAssetUrl = async (assetId) => {
    const asset = await client.getAsset(assetId);
    return asset.fields.file.url; // Retorna a URL do arquivo
};

export async function getStaticPaths() {
    const entries = await client.getEntries({
        content_type: 'blogPost',
    });

    const paths = entries.items.map((item) => ({
        params: { slug: item.fields.slug },
    }));

    return {
        paths,
        fallback: false,
    };
}

export async function getStaticProps({ params }) {
    const { items } = await client.getEntries({
        content_type: 'blogPost',
        'fields.slug': params.slug,
    });

    if (!items.length) {
        return { notFound: true };
    }

    let thumbnailUrl = '';
    if (items.length && items[0].fields.thumbnail) {
        const assetId = items[0].fields.thumbnail.sys.id;
        thumbnailUrl = await getAssetUrl(assetId);
    }

    return {
        props: {
            post: items[0],
            thumbnailUrl,
        },
    };
}

export default function PostDetails({ post, thumbnailUrl }) {
    const { title, content, excerpt, author, postedOn } = post.fields;

    return (
        <div>
            <h1>{title}</h1>
            {thumbnailUrl && <img src={thumbnailUrl} alt={title} />}
            <p><strong>Autor:</strong> {author[0]}</p>
            <p><strong>Publicado em:</strong> {new Date(postedOn).toLocaleDateString()}</p>
            <p><strong>Resumo:</strong> {excerpt}</p>

            <div>
                {documentToReactComponents(content)}
            </div>
        </div>
    );
}
