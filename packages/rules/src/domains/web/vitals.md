# Vitals

## TLDR

Always optimize LCP and CLS. Check PageSpeed Insights / Lighthouse. Avoid layout shifts and lazy-loading above-the-fold assets. Good: `<img width="1600" height="900" fetchpriority="high" />`. Bad: `<img src="hero.jpg" />` (missing dimensions), `<script src="optional-3rd-party.js" />` (render-blocking).

## Problem

Low PageSpeed scores are usually a symptom of deeper architectural issues like excessive JavaScript execution, layout shifts, or unoptimized resource loading. A slow application leads to poor search engine rankings (SEO), high bounce rates, and a frustrating experience for users on low-end devices or unstable networks. Ignoring specific metrics like Largest Contentful Paint (LCP) or Cumulative Layout Shift (CLS) means the application might "feel" broken or unresponsive even if the backend is fast.

## Good solution

Aim for a "Green" score (90+) by focusing on the Core Web Vitals:

- **Largest Contentful Paint (LCP)**: Prioritize the loading of the main content. Preload critical images and avoid lazy-loading "above-the-fold" assets.
- **Cumulative Layout Shift (CLS)**: Prevent unexpected movement of page elements. Always specify `width` and `height` for images/videos and reserve space for dynamic content (like ads or skeleton screens).
- **Interaction to Next Paint (INP)**: Ensure the UI responds quickly to user input. Minimize main-thread blocking by breaking up long tasks and optimizing event handlers.
- **Reduce Unused Code**: Use tree-shaking and code splitting to ensure only necessary code is sent to the client.

```html
<!-- GOOD: Reserving space for an image to prevent layout shift -->
<div
  class="image-container"
  style="aspect-ratio: 16 / 9; background: #eee;"
>
  <img
    src="hero.webp"
    alt="Hero Image"
    width="1600"
    height="900"
    fetchpriority="high"
  />
</div>

<!-- GOOD: Preloading critical fonts -->
<link
  rel="preload"
  href="/fonts/inter.woff2"
  as="font"
  type="font/woff2"
  crossorigin
/>
```

## Bad solution

Ignoring performance metrics until the end of development or using "fixes" that only trick the lab data without improving real-world experience.

```html
<!-- BAD: No dimensions, causing layout shift when image loads -->
<img src="hero.jpg" />

<!-- BAD: Lazy loading the main LCP element -->
<img
  src="hero.jpg"
  loading="lazy"
/>
<!-- This DELAYS the initial render! -->
```

## Impact

- **Performance**: Directly improves the speed and responsiveness of the application.
- **User Experience**: Prevents jumpy layouts and ensures content is interactive as soon as possible.
- **Scalability**: Optimized apps consume fewer resources on both the client and the server.
- **Reliability**: Ensures consistent behavior across a wide range of devices and network conditions.

## Exceptions

- **Internal Administrative Tools**: While performance is still important, the strict SEO-driven requirements of PageSpeed Insights might be less critical than feature completeness.
- **Heavy Visual Experiments**: Creative websites (like WebGL experiments) that intentionally push hardware limits and expect a higher-end device from the user.

## References

- [Google: Web Vitals](https://web.dev/vitals/)
- [Google: PageSpeed Insights](https://pagespeed.web.dev/)
- [Google: Optimize Largest Contentful Paint](https://web.dev/optimize-lcp/)
- [Google: Optimize Cumulative Layout Shift](https://web.dev/optimize-cls/)
