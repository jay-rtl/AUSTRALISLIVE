# AUSTRALIS LIVE

Astro static website for Entertainment and Management. The site features the official supplied logo, a session-aware cinematic entrance, responsive navigation, verified tour artwork and official ticket destinations.

## Local development

Node.js 24 and npm are required. In PowerShell:

```powershell
npm.cmd ci
npm.cmd run dev
```

Open `http://localhost:4321/AUSTRALISLIVE/`. Run `npm.cmd run build` for Astro/TypeScript checks and static output. `npm.cmd run preview` serves the generated site.

In development, `?replay-intro=1` replays the entrance. Production shows it once per tab session; reduced-motion visitors skip it.

## Content

- Brand configuration: `src/config/site.ts`
- Shows, dates, artwork and official ticket URLs: `src/data/shows.ts`
- Services: `src/data/services.ts`
- Navigation: `src/data/navigation.ts`
- Optional public inquiry email: `PUBLIC_CONTACT_EMAIL` at build time

The contact page directs visitors to verified external ticket listings. No form collects personal information. An AUSTRALIS LIVE email has not been supplied; its email card stays hidden until configured. Unapproved legal draft pages are not published.

LAKAS TAMA features the six client-supplied 2026 dates. Australian cities link to their Humanitix events. Christchurch and Auckland link to official tour updates until direct tickets are verified. Nurse Even includes the four client-supplied past dates and official Sydney artwork, not claimed photographs of the shows.

## Artwork provenance

The original official logo at `public/images/brand/australis-live-logo.png` is unchanged. Its SHA256 is `DBE35031064DD30BB10D64B00842264A7F8E923D0AD8217EDA59B7E0EE8EC864`.

Tour posters are resized, uncropped WebP copies of artwork from the client's reference sources. Embedded credits and producer logos are retained.

- LAKAS TAMA: https://www.strictlyepicstudio.com/
- Poster: https://static.wixstatic.com/media/9c38c4_4dfb8c171a154139b708a748f958c845~mv2.png
- Tickets: https://collections.humanitix.com/lakas-tama-australia-new-zealand-tour-2026
- Nurse Even: https://events.humanitix.com/nurse-even-this-is-bullshift-sydney
- Poster: https://images.humanitix.com/i/80686a9e-3382-469f-888e-ec44774b961c.png
- Tour photo destination: https://www.facebook.com/StrictlyEpicStudio/

Decorative atmosphere images in `public/images/atmosphere/` were AI-generated for this site's design. They are not presented as photographs of client projects or shows. The fabricated project entries and staff portrait have been removed from the public experience.

## Deploy yourself: GitHub Pages

The existing `.github/workflows/deploy.yml` builds and publishes pushes to `main`. In GitHub, select Settings > Pages > Source: GitHub Actions once.

Review and commit the changes you want to publish, then:

```powershell
npm.cmd run build
git push origin main
```

The workflow supplies the GitHub owner and repository base path automatically. Local defaults target `https://jay-rtl.github.io/AUSTRALISLIVE/`. QA artifacts under `artifacts/` are not needed for deployment.

## Deploy yourself: root domain / Hostinger

Set your actual domain and root path, then build:

```powershell
$env:PUBLIC_SITE_URL='https://YOUR-DOMAIN'
$env:PUBLIC_BASE_PATH='/'
npm.cmd run build
```

Upload the contents of `dist/` to the domain's document root (typically `public_html/`). Keep backups of existing live files before replacement. Node.js is only needed to build locally, not on the static host.

## Browser QA

```powershell
node scripts/qa-capture.mjs http://localhost:4321/AUSTRALISLIVE/ 390 844 artifacts/qa/mobile.png reduce full
```

The capture script records overflow, runtime errors, image loading, session behavior and mobile menu interactions alongside screenshots. It requires Chrome; set `CHROME_PATH` to override its location. QA output and source-download archives should remain local.
