---
description: "Domains: Frontend: Platform-agnostic frontend development. Applicable to Websites, SPAs, desktop apps, mobile apps but not to be specific to one of them."
---

- **Avoid one-key shortcuts**: Use multi-key combinations (e.g., `Ctrl+S`, `Cmd+K`) instead of single-key shortcuts.
- **Avoid pixel perfect**: Implement fluid, adaptable, and system-driven layouts instead of trying to match design mockups down to the exact pixel for certain screen size.
- **Encapsulate design in components**: Reuse components, not styling rulesets. Avoid exporting utility styling groups (CSS classes, style objects constants) disconnected from markup.
- **Extract layout components**: Use high-level layout components like `Grid` or `Stack` instead of raw styles (like CSS flexbox or grid).
- **Optimize image delivery**: Deliver images in modern formats (WebP/AVIF), use responsive resizing, and implement lazy loading.
- **Separate pages from features**: Organize the pages layer as a thin compositional wrapper around domain-based feature modules to separate routing from business logic.
- **Use CSS to style SVGs**: Use `currentColor` or CSS variables instead of hardcoding colors directly in SVG files.
- **Use endpoint IoC**: For screens or pages, allow them to control full layout structure by reusing individual components and common layouts. Avoid restricting them to content-only, being automatically injected into a rigid, global wrapper.
