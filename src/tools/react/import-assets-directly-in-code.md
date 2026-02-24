# Import assets directly in code

## TLDR

Import images, SVGs, and other static assets directly in your component files using `import` statements. Avoid using raw string paths to reference files located in static or public directories.

## Problem

Using raw string paths (e.g., `<img src="/images/logo.png" />`) creates a "blind spot" for your build tools. Because the build system doesn't know the file is being used, it cannot perform critical optimizations like **content hashing** (for cache busting) or automatic file minification. More importantly, it becomes nearly impossible to track asset usage across a large codebase. This leads to "asset bloat," where unused images accumulate in the project because developers are afraid to delete them, not knowing if they are referenced somewhere by a raw string.

## Good solution

Import the asset as a module. This allows the build tool (like Vite or Webpack) to include the asset in the dependency graph, enabling optimization and usage tracking.

```tsx
// Good: Build tools track this usage and apply content hashing
import logoUrl from '../assets/logo.png';

export const Logo = () => {
  return <img src={logoUrl} alt="Company Logo" />;
};
```

## Bad solution

Using hardcoded string paths that bypass the build system's dependency graph.

```tsx
// Bad: Build tools cannot verify if this file exists or is still in use
export const Logo = () => {
  return <img src="/static/logo.png" alt="Company Logo" />;
};
```

## Impact

- **[Maintainability](../../home/impact/positive/maintainability.md)**: Allows build tools to identify and prune unused assets, keeping the project bundle lean.
- **[Robustness](../../home/impact/positive/robustness.md)**: Enables automatic cache busting via content hashing (e.g., `logo.a1b2c3.png`), ensuring users always see the latest version of an asset.
- **[Reliability](../../home/impact/positive/reliability.md)**: Build tools will throw an error at compile-time if an imported asset is missing, preventing broken images in production.

## Exceptions

- **Dynamic External URLs**: Images hosted on a CDN or external CMS where the path is provided by an API at runtime.
- **Favicons / SEO Meta**: Standard files that must live at the root of the `public` directory (like `robots.txt` or `manifest.json`) for browser and crawler access.
