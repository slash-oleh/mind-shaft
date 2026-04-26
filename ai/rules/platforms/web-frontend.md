---
description: "Platforms: Web frontend"
---

- **Avoid one-key shortcuts**: Use multi-key combinations (e.g., `Ctrl+S`, `Cmd+K`) instead of single-key shortcuts.
- **Optimize application bundling**: Implement code splitting and lazy loading for routes and large components.
- **Optimize for PageSpeed Insights**: Optimize Core Web Vitals like LCP and CLS to meet PageSpeed Insights standards.
- **Optimize image delivery**: Deliver images in modern formats (WebP/AVIF), use responsive resizing, and implement lazy loading.
- **Use CSS to style SVGs**: Use `currentColor` or CSS variables instead of hardcoding colors directly in SVG files.
- **Use effective caching policies**: Use long-term caching for hashed static assets and `must-revalidate` for entry points like `index.html`.
- **Use IoC for page and navigation**: Invert the control of page structure by allowing individual page components to compose their own layouts rather than being injected into a rigid, global wrapper.
- **Use Server-Side Rendering (SSR)**: Use Server-Side Rendering (SSR) for public-facing applications.
- **Use Storybook for UI kit components only**: Focus Storybook on isolated UI components and atomic design elements rather than complex, business-specific compound components that are tightly coupled to data and infrastructure.
