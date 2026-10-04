export const siteConfig = {
  siteName: 'Australis Live',
  brandDisplayName: 'AUSTRALIS LIVE',
  brandDescriptor: 'Entertainment and Management',
  siteUrl: import.meta.env.PUBLIC_SITE_URL ?? 'https://jay-rtl.github.io',
  defaultTitle: 'Australis Live | Entertainment and Management',
  defaultDescription:
    'AUSTRALIS LIVE — Entertainment and Management. Live entertainment, touring shows and creative production.',
  defaultOgImage: '/images/brand/australis-live-logo.png',
  logoPath: '/images/brand/australis-live-logo.png',
  locale: 'en',
  tagline: 'Live moments. Lasting memories.',
} as const;

// Centralized homepage copy.
export const homeCopy = {
  eyebrow: 'Entertainment · Management · Live experiences',
  headline: ['Creating moments', 'that move people.'],
  summary: 'Entertainment, creative production and live experiences — brought together with intention, atmosphere and energy.',
  workCta: 'Explore the shows',
  inquiryCta: 'Lakas Tama tour',
} as const;
