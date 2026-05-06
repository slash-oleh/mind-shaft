---
description: "Domains: Web: Everything that is either backend or frontend or both, but only relevant for web platform."
---

- **Application bundling**: Always use code splitting and lazy loading for routes and heavy components. Avoid static imports for everything in main entry, unless lightweight SPA. Good: `const Page = lazy(() => import('./Page'))`. Bad: `import { Page } from './Page'`.
- **Cache busting**: For static assets, always use cache busting via filenames. Avoid stale content in browser cache. Good: `main.a1b2c3.js`. Bad: `main.js`.
- **Caching policies**: For static assets, always use long-term immutable caching with content hashes. For entry points, avoid caching, use `must-revalidate` instead. Good: `Cache-Control: max-age=31536000, immutable` (for `main.a1b2c3.js`). Bad: `Cache-Control: max-age=31536000` (for `main.js` without hash).
- **SSR**: For public apps and SEO-critical content, public-facing multi-page applications with promo indexable pages, always use Server-Side Rendering. Good: `<meta name="description" content="SSR Page" />` (in initial HTML). Bad: `document.title = "CSR Page"` (set via JS, hidden from bots in initial document).
- **Storybook scope**: When using Storybook, always add stories for atomic components. Avoid stories for complex modules with infrastructure dependencies (API, state, routing). Good: `export const Primary = () => <Button label="Ok" />`. Bad: `ComplexSection.decorators = [(Story) => <MockedApi><MockedState><Story/></MockedState></MockedApi>]`.
- **Vitals**: Always optimize LCP and CLS. Check PageSpeed Insights / Lighthouse. Avoid layout shifts and lazy-loading above-the-fold assets. Good: `<img width="1600" height="900" fetchpriority="high" />`. Bad: `<img src="hero.jpg" />` (missing dimensions), `<script src="optional-3rd-party.js" />` (render-blocking).
