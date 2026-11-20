# Release verification

Checked on 19 November 2026 against a local production build using Chrome 157, Playwright 1.65.1, axe-core 4.14.1 and Lighthouse 13.6.0. Source verification and remote product availability are recorded in [the research notes](sources.md) and [capture inventory](captures.md).

## Lighthouse

| Homepage profile | Performance | Accessibility | Best practices | SEO | Largest contentful paint | Total blocking time | Cumulative layout shift |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| Simulated mobile | 92 | 100 | 100 | 100 | 3.3 s | 110 ms | 0 |
| Desktop preset | 100 | 100 | 100 | 100 | 0.7 s | 0 ms | 0 |

The figures are single lab runs against `next start` on loopback with Lighthouse’s mobile and desktop presets. Hosting latency and visitor devices will affect real-world results. Mobile largest contentful paint remains the principal performance limit.

## Build and interaction checks

- ESLint, Next route generation, TypeScript and the optimized production build passed. The homepage and all eleven case studies were pre-rendered.
- The homepage, eleven case-study URLs, sitemap, robots file, favicon and social image returned successful responses. Unknown work slugs and unrelated missing paths returned HTTP 404.
- Case studies rendered at 320px without horizontal overflow. Homepage width checks passed at 320, 360, 550, 760, 768, 900, 1024, 1366 and 1920px. Separate captures cover 390px phones and a 1440px desktop.
- Tested archive gallery and index modes, selected-work navigation, mobile navigation, social destinations, image decoding and the illustration’s enlarged view.
- Tested Ctrl+K and Cmd+K, command search, help, empty results, arrow selection, Enter navigation, tab cycling, Escape dismissal and focus return.
- Checked the skip link and the behavior of the entrance animation with normal and reduced-motion preferences.
- Automated WCAG A/AA checks reported zero violations in the tested homepage, mobile layout, representative case study, command palette and print dialog. The browser navigation run reported zero console errors, page errors or failed local resource responses.

## Visual review

The first review identified awkward wrapping of the headline and calls to action at 320px and on tablets. The first refinement adjusted responsive typography, button spacing, workstation framing and the desktop hero height.

The second review led to larger image labels and mobile header controls, clearer project status in the gallery and a separated action row on the lead archive entry. Keyboard checks led to an additional correction to the command button’s accessible name and the palette’s focus cycle.

The initial mobile Lighthouse run identified the workstation illustration as the largest contentful element. The mobile AVIF is 45,041 bytes, down from the 133,860-byte WebP fallback. The desktop AVIF is 141,944 bytes. Both retain the print detail at their intended display size.

## Final screenshots

[Desktop](../output/playwright/desktop.png) · [Laptop](../output/playwright/laptop.png) · [Tablet](../output/playwright/tablet.png) · [Mobile](../output/playwright/mobile.png) · [Small mobile](../output/playwright/small-mobile.png)

[Project archive](../output/playwright/work.png) · [Case study](../output/playwright/case-study.png) · [Mobile case study](../output/playwright/mobile-case-study.png) · [Command palette](../output/playwright/command-palette.png) · [Experiments](../output/playwright/experiments.png) · [About](../output/playwright/about.png) · [Contact](../output/playwright/contact.png)

## Deployment

The repository includes the Vercel framework configuration, a reproducible npm lockfile and a successful production build. A Vercel CLI credential or token was unavailable on this machine. The preview is served locally.
