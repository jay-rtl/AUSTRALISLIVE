/** Prefix a site-local path with Astro's configured deployment base. */
export function withBase(path = '/') {
  if (/^(?:https?:|mailto:|tel:|#)/.test(path)) return path;

  const base = import.meta.env.BASE_URL === '/' ? '' : import.meta.env.BASE_URL.replace(/\/$/, '');
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  return `${base}${normalizedPath}` || '/';
}
