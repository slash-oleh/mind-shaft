---
description: "Platforms: Web frontend"
---

- Use multi-key combinations (e.g., `Ctrl+S`, `Cmd+K`) instead of single-key shortcuts.
- Implement code splitting and lazy loading for routes and large components.
- Optimize Core Web Vitals like LCP and CLS to meet PageSpeed Insights standards.
- Deliver images in modern formats (WebP/AVIF), use responsive resizing, and implement lazy loading.
- Use `currentColor` or CSS variables instead of hardcoding colors directly in SVG files.
- Use long-term caching for hashed static assets and `must-revalidate` for entry points like `index.html`.
- Invert the control of page structure by allowing individual page components to compose their own layouts rather than being injected into a rigid, global wrapper.
- Use Server-Side Rendering (SSR) for public-facing applications.
- Focus Storybook on isolated UI components and atomic design elements rather than complex, business-specific compound components that are tightly coupled to data and infrastructure.
