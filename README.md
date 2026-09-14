# MonsterMinds Sample Website

A production-oriented Astro website for a public MonsterMinds client presentation. The homepage visual experience is implemented with a cinematic hero, editorial sections, responsive GSAP motion, polished interactions, and optimized concept imagery. Final client facts, project records, legal text, contact details, and official media remain pending.

## Demo status

- All portfolio entries and service descriptions are marked as demo content.
- The contact form validates in the browser but never transmits or stores data.
- The legal routes are placeholders and carry `noindex` metadata.
- `public/images/brand/monsterminds-logo.svg` is a temporary asset marker because the original logo binary was not included in the attachment bundle. Replace it with an optimized export of the official supplied logo, preserving the filename or update the single `logoPath` setting in `src/config/site.ts`.
- Homepage copy and imagery are tasteful concept content, not verified MonsterMinds claims or client work.
- Internal pages retain the Phase 1 editorial foundation and are intentionally awaiting separate page-specific design approval.

## Stack

- Astro static generation
- TypeScript
- Modern CSS
- GSAP and ScrollTrigger for progressive-enhancement motion
- `@astrojs/sitemap`
- GitHub Actions for Pages deployment

No server, database, framework runtime, or paid form provider is required.

## Local setup

Requirements: Node.js 24 and npm.

```sh
npm install
npm run dev
```

Astro normally opens the site at `http://localhost:4321/monsterminds/` because the Phase 1 default simulates a GitHub project site base path.

Available commands:

```sh
npm run dev      # local development server
npm run check    # Astro and TypeScript validation
npm run build    # check, then generate static output
npm run preview  # preview the generated output
npm run qa:capture -- <url> <width> <height> <output> [motion] [mode]
```

Copy `.env.example` to `.env` when you need local overrides. Environment files are ignored by Git.

During local development only, append `?replay-intro=1` to the homepage URL to clear the intro session flag and replay the full logo sequence. The reset is guarded by `import.meta.env.DEV` and remains inactive in production builds.

## Deployment configuration

Deployment values are intentionally centralized:

- `PUBLIC_SITE_URL` is the URL origin, such as `https://USERNAME.github.io` or `https://example.com`.
- `PUBLIC_BASE_PATH` is `/REPOSITORY` for a GitHub project site and `/` for a root/custom-domain deployment.
- Content-level metadata defaults are in `src/config/site.ts`.

All site-local links and public asset URLs use Astro's generated base URL. Do not introduce hardcoded root-relative links in components or content templates.

## GitHub Pages

The workflow at `.github/workflows/deploy.yml` runs for pushes to `main` and can also be run manually. It:

1. Checks out the repository.
2. Sets up Node and the npm cache.
3. Configures GitHub Pages.
4. Installs the lockfile with `npm ci`.
5. Builds with the repository owner and repository name injected as `site` and `base`.
6. Uploads `dist` as the Pages artifact.
7. Deploys through the protected `github-pages` environment.

In the GitHub repository, choose **Settings → Pages → Build and deployment → Source: GitHub Actions**. No deployment secret is needed.

## Hostinger static deployment

Hostinger does not need Node.js. Build locally or in CI with a root base path, then upload the **contents** of `dist/` to `public_html/`.

PowerShell:

```powershell
$env:PUBLIC_SITE_URL='https://your-production-domain.example'
$env:PUBLIC_BASE_PATH='/'
npm run build
```

Bash:

```sh
PUBLIC_SITE_URL=https://your-production-domain.example PUBLIC_BASE_PATH=/ npm run build
```

Upload only the generated static files. A future Hostinger-compatible PHP form handler may be added beside them after its requirements are approved; Astro SSR is neither enabled nor required.

## Project structure

```text
.github/workflows/       GitHub Pages deployment
public/images/           Stable public brand/demo assets
src/components/          Shared header, menu, footer, SEO, and page primitives
src/config/              Central site identity and metadata defaults
src/data/                Navigation, services, contact, and social placeholders
src/layouts/             Shared document layout
src/pages/               Static multi-page routes and dynamic project template
src/scripts/animations/  Intro, hero, reveal, service, and shared GSAP modules
src/styles/              Design tokens and global responsive foundation
src/utils/               Base-path URL helper
```

## Replacing content

- Site identity, fallback metadata, logo path: `src/config/site.ts`
- Navigation: `src/data/navigation.ts`
- Services: `src/data/services.ts`
- Contact placeholders/form mode: `src/data/contact.ts`
- Social destinations: `src/data/socials.ts`
- Typed portfolio model and entries: `src/data/projects.ts`

Keep unverified material explicitly marked as demo content. Replace content data without coupling it to future animation code.

## Animation notes

The homepage animation system is split into focused modules under `src/scripts/animations/`. The first-session intro uses `sessionStorage`; return visits receive only a short hero entrance. A 4.5-second safety fallback prevents the overlay from trapping visitors if the main bundle fails. Pointer parallax is limited to fine-pointer desktop devices, mobile motion distances are reduced, and `prefers-reduced-motion` bypasses the intro and non-essential transforms. All critical content remains in crawlable HTML.

## Demo image assets

The WebP files under `public/images/demo/homepage/` were generated specifically for this concept using the built-in OpenAI image generation tool, then resized and compressed locally with Sharp. They contain no client logos, readable brand text, or claimed project documentation. Replace them with approved, licensed MonsterMinds media before production launch.

## Visual QA

The reusable `scripts/qa-capture.mjs` utility drives an installed Chromium browser through the DevTools protocol. It can emulate exact mobile metrics, wait for the intro, capture screenshots, check critical images and horizontal overflow, record runtime/network errors, verify same-session intro replay behavior, and exercise mobile-menu Escape/focus/scroll-lock behavior.

## Production checklist for later phases

- Replace the logo marker with the untouched official logo export.
- Confirm final domain and repository name.
- Supply approved company, service, project, contact, social, and legal content.
- Supply approved MonsterMinds imagery and a production social-share image.
- Decide between a Hostinger PHP handler and an approved third-party contact provider.
- Complete page-specific visual design and audits for the remaining internal routes after approval.
