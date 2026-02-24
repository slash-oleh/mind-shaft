# Use Server-Side Rendering (SSR)

Prefer Server-Side Rendering (SSR) for public-facing applications to improve initial load performance, enhance SEO, and ensure content accessibility.

## Problem

Pure Client-Side Rendering (CSR) delivers a nearly empty HTML shell to the browser. The user must wait for the entire JavaScript bundle to be downloaded, parsed, and executed before the application can fetch data and render any meaningful content. This leads to a poor "First Contentful Paint" (FCP) and a frustrating experience for users on slow devices or high-latency networks.

Additionally, search engine crawlers and social media bots may struggle to index content that is rendered purely via JavaScript, resulting in poor SEO and broken social media previews (OG tags). Users with disabled or slow-loading JavaScript are also left with a blank or broken page.

## Good solution

Use a framework that supports SSR (like Next.js, Remix, or Nuxt.js) to pre-render the initial HTML on the server. This allows the browser to display static content immediately while the interactive JavaScript parts "hydrate" in the background.

```typescript
// GOOD: Server-side data fetching in Next.js (App Router Example)
export default async function Page() {
  // Data is fetched on the server during the initial request
  const data = await fetchData();

  return (
    <main>
      <h1>{data.title}</h1>
      <p>{data.body}</p>
      {/* Client-side interactions will hydrate later */}
      <InteractiveCounter />
    </main>
  );
}
```

## Bad solution

Serving an empty root element and relying entirely on client-side hooks to fetch and render the primary page content.

```html
<!-- BAD: Empty HTML shell that needs JS to show anything -->
<!DOCTYPE html>
<html>
<head>
    <title>My App</title>
</head>
<body>
    <div id="root"></div> <!-- User sees nothing until main.js runs -->
    <script src="/main.js"></script>
</body>
</html>
```

## Why

- **[Performance](../../home/quality-attributes/positive/performance.md)**: Dramatically improves First Contentful Paint (FCP) and Largest Contentful Paint (LCP) by sending rendered HTML.
- **[SEO](../../home/quality-attributes/positive/readability.md)**: Ensures that search engines and social bots see a fully populated page, improving indexability and social sharing.
- **[Accessibility](../../home/quality-attributes/positive/accessibility.md)**: Basic content is available even if JavaScript fails to load or is disabled.
- **[UX](../../home/quality-attributes/positive/readability.md)**: Reduces the "blank screen" time, providing a smoother and more reliable initial experience.

## Exceptions

- **Internal Dashboard/SaaS Apps**: Where the user is already authenticated and SEO is not a factor, CSR might be acceptable to reduce server load.
- **True Single-Page Applications (SPAs)**: One-page dashboards or tools with a highly centralized UI that focus more on interactive state management than on multi-page navigation or SEO.
- **Offline-First Apps**: PWA or local-only tools where the server component is minimal or non-existent.

## References

- [Next.js: Rendering Fundamentals](https://nextjs.org/docs/app/building-your-application/rendering)
- [Web.dev: Rendering on the Web](https://web.dev/rendering-on-the-web/)
- [Vercel: What is SSR?](https://vercel.com/glossary/server-side-rendering-ssr)
