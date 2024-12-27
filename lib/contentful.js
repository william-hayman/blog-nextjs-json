import { createClient } from 'contentful';

const client = createClient({
    space: process.env.CONTENTFUL_SPACE_ID, // Substitua pelo Space ID
    accessToken: process.env.CONTENTFUL_ACCESS_TOKEN, // Substitua pelo Token de Acesso
});

export default client;
