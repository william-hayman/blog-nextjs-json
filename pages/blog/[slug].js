import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { BLOCKS } from '@contentful/rich-text-types';
import client from '@/lib/contentful';
import {NavBar} from "@/components/navbar";

const getAssetUrl = async (assetId) => {
    const asset = await client.getAsset(assetId);
    return asset.fields.file.url;
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

    const options = {
        renderNode: {
            [BLOCKS.EMBEDDED_ASSET]: (node) => {
                const { file, title } = node.data.target.fields;
                return (
                    <img
                        src={`https:${file.url}`}
                        alt={title || "Imagem do conteúdo"}
                        style={{ maxWidth: "100%", height: "auto" }}
                        className={'rounded'}
                    />
                );
            },
        },
    };


    return (
        <div>
<NavBar />
            <h1>{title}</h1>
            {thumbnailUrl && <img src={thumbnailUrl} alt={title} />}
            <p><strong>Autor:</strong> {author[0]}</p>
            <p><strong>Publicado em:</strong> {new Date(postedOn).toLocaleDateString()}</p>
            <p><strong>Resumo:</strong> {excerpt}</p>

            <div>
                {documentToReactComponents(content, options)}
            </div>
        </div>
    );
}
