import type { APIRoute } from 'astro';
import { siteConfig } from '../config/site';

export const GET: APIRoute = ({ site }) => {
  const origin = site ?? new URL(siteConfig.siteUrl);
  const sitemap = new URL(`${import.meta.env.BASE_URL}sitemap-index.xml`, origin);

  return new Response(`User-agent: *\nAllow: /\nSitemap: ${sitemap.href}\n`, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
};
