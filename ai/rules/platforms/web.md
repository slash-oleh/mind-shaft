---
description: "Platforms: Web"
---

- **Configure caching policies**: Use long-term caching for hashed static assets and `must-revalidate` for entry points like `index.html`.
- **Keep Storybook concise**: Use Storybook for isolated UI and atomic elements. Avoid complex components tied to data or infrastructure.
- **Optimize application bundling**: Implement code splitting and lazy loading for routes and large components.
- **Respect PageSpeed Insights**: Optimize Core Web Vitals like LCP and CLS to meet PageSpeed Insights standards.
- **Use SSR**: Use Server-Side Rendering for public-facing multi-page applications with promo sections.
