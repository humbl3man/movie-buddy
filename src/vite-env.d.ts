/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_MOVIE_API_KEY_v3: string;
  readonly VITE_FIREBASE_API_KEY: string;
}
interface ImportMeta {
  readonly env: ImportMetaEnv;
}
