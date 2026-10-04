import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

const site = process.env.PUBLIC_SITE_URL || 'https://jay-rtl.github.io';
const rawBase = process.env.PUBLIC_BASE_PATH || '/AUSTRALISLIVE';
const base = rawBase === '/' ? '/' : `/${rawBase.replace(/^\/+|\/+$/g, '')}`;

export default defineConfig({
  site,
  base,
  output: 'static',
  trailingSlash: 'always',
  integrations: [
    sitemap({
      filter: (page) => !page.endsWith('/privacy/') && !page.endsWith('/terms/'),
    }),
  ],
  build: {
    format: 'directory',
  },
});
