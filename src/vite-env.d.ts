interface ImportMetaEnv {
  readonly VITE_WEBSITE_DOMAIN: string;
  readonly VITE_GISCUS_REPO: string;
  readonly VITE_GISCUS_REPO_ID: string;
  readonly VITE_GISCUS_CATEGORY_ID: string;
  readonly VITE_SPLITBEE_TOKEN: string;
  readonly VITE_SPOTIFY_CLIENT_ID: string;
  readonly VITE_SPOTIFY_CLIENT_SECRET: string;
  readonly VITE_SPOTIFY_REFRESH_TOKEN: string;
  readonly VITE_EMAIL_HOST: string;
  readonly VITE_EMAIL_USER: string;
  readonly VITE_EMAIL_PASSWORD: string;
  readonly VITE_EMAIL_TO: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}