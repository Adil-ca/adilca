# ADIL.CA / The Digital Archive

Adil CA’s personal portfolio. The homepage pairs a print illustration of a workstation with a searchable archive of five featured projects and six experiments. All eleven records have their own case study. Fifteen real interface captures accompany the project files.

## Run locally

Use Node.js 24 and npm. From the project directory, run:

```sh
npm ci
npm run dev
```

Open [the development site](http://localhost:3000). No account, API key, or database is required.

## Check and serve a production build

```sh
npm run lint
npm run typecheck
npm run build
npm start
```

The Next.js App Router pre-renders the homepage and case studies. Fonts ship with the application. The hero uses responsive AVIF with WebP fallbacks. Project captures use the Next.js image optimizer.

## Update the archive

| File or directory | Contents |
| --- | --- |
| `src/data/archive.ts` | Project narratives, contributions, status, source and live URLs, featured selection, community roles and toolkit |
| `src/data/site.ts` | Identity, introduction, biography, navigation and social destinations |
| `src/data/presentation.ts` | Cover colours, verified captures and links to detail views |
| `public/projects/` | Captures named by project slug, with an optional `-detail` suffix |
| `public/art/` | Original workstation illustration, responsive versions and paper grain |
| `src/app/globals.css` | Typography, layout, colour, focus states and reduced-motion rules |
| `public/social.jpg` | 1200 × 630 sharing image |
| `public/brand/` | Official source artwork and high-density navigation mark |
| `public/site.webmanifest`, `public/favicon*`, Apple and Android PNGs | Browser and home-screen icons registered in root layout metadata |

Choose a unique slug and set the project's `featured` flag. Routes, the command palette and the sitemap follow the inventory. Register each available capture in `presentation.ts`. An entry can have source only, a live destination only, both or neither. Preserve its verified status in the case study.

## Navigation

### Field Journal

The homepage previews the first entry in `src/data/journal.ts`. Add a journal entry there with its story, location, dates, cover and ordered photo chapters. Store original images under `public/gallery/` and record their intrinsic dimensions, alt text and captions. The journal page renders each entry and builds its viewer sequence from the chapter order.

Use **Ctrl+K** on Windows or Linux, or **Cmd+K** on macOS. Search by project, page, or social destination. Arrow keys move the selection, Enter opens it, and Escape closes the palette. The header also opens it by pointer or touch. Gallery and Index provide two views of the featured work. Select a project capture on a case-study page to inspect the full-size image.

## Vercel preview

The checked-in `vercel.json` selects Next.js. Use this directory as the project root with the default install and build commands. With an authenticated Vercel CLI, `vercel deploy` creates a preview. The project's owner must approve production publication or domain changes. [Vercel deployment guide](https://vercel.com/docs/projects/deploy-from-cli)

Set `SITE_URL` to the approved absolute public URL when preparing the production release. It supplies the canonical origin for metadata, structured data and the sitemap. The code otherwise uses Vercel's project hostname, the deployment hostname, or the local development origin. Rebuild after changing the origin.

## Evidence and review

- [Design studies and comparison](docs/design.md)
- [Project and affiliation sources](docs/sources.md)
- [Screenshot provenance and deployment availability](docs/captures.md)
- [Workstation illustration and original generation prompt](docs/artwork.md)
- [Verification and Lighthouse results](docs/qa.md)
- [Final browser screenshots](output/playwright/)
