---
description: "Platforms: Web frontend"
---

# Platforms: Web frontend

## Avoid one-key shortcuts
Use multi-key combinations (e.g., `Ctrl+S`, `Cmd+K`) instead of single-key shortcuts.
[read more](https://github.com/insolite/dev-rules/blob/main/src/platforms/web-frontend/avoid-one-key-shortcuts.md)

## Optimize application bundling
Implement code splitting and lazy loading for routes and large components.
[read more](https://github.com/insolite/dev-rules/blob/main/src/platforms/web-frontend/optimize-application-bundling.md)

## Optimize for PageSpeed Insights
Optimize Core Web Vitals like LCP and CLS to meet PageSpeed Insights standards.
[read more](https://github.com/insolite/dev-rules/blob/main/src/platforms/web-frontend/optimize-for-pagespeed-insights.md)

## Optimize image delivery
Deliver images in modern formats (WebP/AVIF), use responsive resizing, and implement lazy loading.
[read more](https://github.com/insolite/dev-rules/blob/main/src/platforms/web-frontend/optimize-image-delivery.md)

## Use CSS to style SVGs
Use `currentColor` or CSS variables instead of hardcoding colors directly in SVG files.
[read more](https://github.com/insolite/dev-rules/blob/main/src/platforms/web-frontend/use-css-to-style-svgs.md)

## Use effective caching policies
Use long-term caching for hashed static assets and `must-revalidate` for entry points like `index.html`.
[read more](https://github.com/insolite/dev-rules/blob/main/src/platforms/web-frontend/use-effective-caching-policies.md)

## Use IoC for page and navigation
Invert the control of page structure by allowing individual page components to compose their own layouts rather than being injected into a rigid, global wrapper.
[read more](https://github.com/insolite/dev-rules/blob/main/src/platforms/web-frontend/use-ioc-for-page-and-navigation.md)

## Use Server-Side Rendering (SSR)
Use Server-Side Rendering (SSR) for public-facing applications.
[read more](https://github.com/insolite/dev-rules/blob/main/src/platforms/web-frontend/use-server-side-rendering-ssr.md)

## Use Storybook for UI kit components only
Focus Storybook on isolated UI components and atomic design elements rather than complex, business-specific compound components that are tightly coupled to data and infrastructure.
[read more](https://github.com/insolite/dev-rules/blob/main/src/platforms/web-frontend/use-storybook-for-ui-kit-components-only.md)
