export const siteConfig = {
  siteName: 'MonsterMinds',
  siteUrl: import.meta.env.PUBLIC_SITE_URL ?? 'https://example.github.io',
  defaultTitle: 'MonsterMinds — Creative Services Demo',
  defaultDescription:
    'A sample portfolio website for MonsterMinds. Final company content and project information are required.',
  defaultOgImage: '/images/demo/og-placeholder.svg',
  logoPath: '/images/brand/monsterminds-logo.svg',
  locale: 'en',
  demoNotice: 'Sample website — client content required',
} as const;
