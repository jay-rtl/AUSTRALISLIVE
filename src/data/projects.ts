export type Project = {
  slug: string;
  title: string;
  category: string;
  year: string;
  shortDescription: string;
  coverImage: string;
  gallery: string[];
  client?: string;
  location?: string;
  seoTitle: string;
  seoDescription: string;
  ogImage?: string;
  isDemo: true;
  order: number;
  content: string[];
};

export const projects: Project[] = [
  {
    slug: 'demo-editorial-study',
    title: 'Demo Editorial Study',
    category: 'DEMO PROJECT',
    year: '[YEAR REQUIRED]',
    shortDescription: 'A clearly marked placeholder entry used to validate the portfolio detail template.',
    coverImage: '/images/demo/homepage/material-study.webp',
    gallery: [],
    seoTitle: 'Demo Editorial Study — MonsterMinds Sample',
    seoDescription: 'Demo portfolio entry for layout testing. This is not presented as verified MonsterMinds work.',
    isDemo: true,
    order: 1,
    content: [
      'This entry exists only to validate content architecture and routing during Phase 1.',
      '[CLIENT PROJECT CONTENT REQUIRED]',
    ],
  },
  {
    slug: 'demo-experience-study',
    title: 'Demo Experience Study',
    category: 'DEMO PROJECT',
    year: '[YEAR REQUIRED]',
    shortDescription: 'A second placeholder entry for previous and next project navigation testing.',
    coverImage: '/images/demo/homepage/event-environment.webp',
    gallery: [],
    seoTitle: 'Demo Experience Study — MonsterMinds Sample',
    seoDescription: 'Demo portfolio entry for route testing. This is not presented as verified MonsterMinds work.',
    isDemo: true,
    order: 2,
    content: [
      'Final project narrative, media, credits, and metadata have not yet been supplied.',
      '[CLIENT PROJECT CONTENT REQUIRED]',
    ],
  },
  {
    slug: 'demo-spatial-study',
    title: 'Demo Spatial Study',
    category: 'DEMO PROJECT',
    year: '[YEAR REQUIRED]',
    shortDescription: 'A conceptual production study used to demonstrate the featured-work composition.',
    coverImage: '/images/demo/homepage/hero-stage.webp',
    gallery: [],
    seoTitle: 'Demo Spatial Study — MonsterMinds Sample',
    seoDescription: 'Demo portfolio entry for layout testing. This is not presented as verified MonsterMinds work.',
    isDemo: true,
    order: 3,
    content: [
      'This conceptual entry exists only to demonstrate the future editorial project format.',
      '[CLIENT PROJECT CONTENT REQUIRED]',
    ],
  },
];
