export const siteConfig = {
  siteName: 'Australis Live',
  brandDisplayName: 'AUSTRALIS LIVE',
  brandDescriptor: 'Entertainment and Management',
  siteUrl: import.meta.env.PUBLIC_SITE_URL ?? 'https://example.github.io',
  defaultTitle: 'Australis Live | Entertainment and Management',
  defaultDescription:
    'AUSTRALIS LIVE — Entertainment and Management. Explore a concept presentation of live experiences, entertainment and production.',
  defaultOgImage: '/images/brand/australis-live-logo.png',
  logoPath: '/images/brand/australis-live-logo.png',
  locale: 'en',
  demoNotice: 'Sample website — client content required',
} as const;

// Demo copy pending final client approval.
export const homeCopy = {
  eyebrow: 'Entertainment · Management · Live experiences',
  headline: ['Creating moments', 'that move people.'],
  summary: 'Entertainment, creative production and live experiences — brought together with intention, atmosphere and energy.',
  workCta: 'Explore our work',
  inquiryCta: 'Make an inquiry',
} as const;
