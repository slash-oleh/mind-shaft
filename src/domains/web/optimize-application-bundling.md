# Optimize application bundling

## TLDR

Implement code splitting and lazy loading for routes and large components.

## Problem

Modern frontend applications can grow significantly in size as more features and third-party libraries are added. If the entire application is bundled into a single large JavaScript file, users must download and parse the complete codebase before the application becomes interactive, even if they only need a fraction of the functionality for their current task. This leads to high "Time to Interactive" (TTI) and poor lighthouse scores, especially on slower networks and mobile devices.

## Good solution

Use code splitting to break the application into smaller chunks and implement lazy loading for components or routes that are not immediately required for the initial render.

```typescript
// GOOD: Dynamic import for route-level lazy loading (React example)
import React, { lazy, Suspense } from 'react';

const HeavyDashboard = lazy(() => import('./pages/Dashboard'));
const AdminPanel = lazy(() => import('./pages/AdminPanel'));

const App = () => (
  <Suspense fallback={<LoadingSpinner />}>
    <Routes>
      <Route path="/dashboard" element={<HeavyDashboard />} />
      <Route path="/admin" element={<AdminPanel />} />
    </Routes>
  </Suspense>
);

// GOOD: Splitting large vendor libraries into separate chunks in vite.config.ts
export default defineConfig({
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom', 'lodash'],
          charts: ['echarts', 'd3']
        }
      }
    }
  }
});
```

## Bad solution

Importing every component and library statically at the top of the main entry file, causing everything to be included in the initial bundle.

```typescript
// BAD: Static imports for everything
import { Dashboard } from './pages/Dashboard';
import { AdminPanel } from './pages/AdminPanel';
import { ComplexChart } from './components/ComplexChart';

// Even if the user never visits /admin, the code for AdminPanel
// is still downloaded and parsed on the first load.
```

## Impact

- **[Performance](../../home/impact/positive/performance.md)**: Reduces the initial bundle size, leading to faster page loads and improved TTI.
- **[Scalability](../../home/impact/positive/scalability.md)**: Allows the application to grow without exponentially increasing the cost of the first visit.
- **[User Experience](../../home/impact/positive/readability.md)**: Provides a more responsive feel as users only download what they actually use.
- **[Size/Code Amount](../../home/impact/negative/size-code-amount.md)**: Optimizes the delivery of code by only sending relevant bytes.

## Exceptions

- **Small Applications**: If the total bundle size is already very small (e.g., < 100kb), the overhead of additional network requests for chunks might outweigh the benefits.
- **Critical Path Components**: Header, Navigation, and the primary content above the fold should usually be included in the main bundle.

## References

- [MDN: Dynamic Imports](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/import)
- [React: Code-Splitting](https://reactjs.org/docs/code-splitting.html)
- [Vite: Building for Production](https://vitejs.dev/guide/build.html#chunking-strategy)
