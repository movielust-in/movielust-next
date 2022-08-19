/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_TMDB_KEY: string;

    readonly VITE_SERVER_URI: string;

    readonly VITE_TWO_EMBED_LINK: string;
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}
