# Caching policies

## TLDR

For static assets, always use long-term immutable caching with content hashes. For entry points, avoid caching, use `must-revalidate` instead. Good: `Cache-Control: max-age=31536000, immutable` (for `main.a1b2c3.js`). Bad: `Cache-Control: max-age=31536000` (for `main.js` without hash).

## Problem

Without proper caching policies, browsers must download every asset (images, scripts, styles) on every page load, leading to slow performance, high bandwidth costs, and poor user experience, especially on mobile or slow connections. Conversely, overly aggressive caching without versioning makes it impossible to deploy updates to existing users, as their browsers will continue to use the old, "stale" versions of the application even after the server has been updated.

## Good solution

Use a combination of content hashing (fingerprinting) for static assets and short-lived caching for the main entry point.

1. **Immutable Assets** (JS, CSS, Images): Include a content hash in the filename (e.g., `main.a1b2c3.js`). Serve these with a long-term `Cache-Control` header.
2. **Entry Point** (`index.html`): Serve this with a policy that requires the browser to check for updates every time.

```http
# GOOD: Configuration for static assets (long-term cache)
HTTP/1.1 200 OK
Cache-Control: public, max-age=31536000, immutable
Content-Type: application/javascript

# GOOD: Configuration for index.html (revalidate every time)
HTTP/1.1 200 OK
Cache-Control: public, max-age=0, must-revalidate
Content-Type: text/html
```

## Bad solution

Using fixed filenames without hashes and long expiration times, or disabling caching entirely for the whole application.

```http
# BAD: Aggressive caching on a fixed filename - updates won't be seen by users
HTTP/1.1 200 OK
Cache-Control: public, max-age=31536000
Content-Type: application/javascript
# Filename: main.js (No hash)

# BAD: No caching at all - slow performance for every visit
HTTP/1.1 200 OK
Cache-Control: no-store
Content-Type: image/png
```

## Impact

- **Performance**: Dramatically reduces page load times for returning visitors by serving assets from the local disk.
- **Scalability**: Reduces the number of requests hitting the server and CDN, lowering infrastructure costs.
- **Reliability**: Content hashing ensures that the browser only caches a version of an asset if it matches the current application state.
- **Consistency**: `must-revalidate` for `index.html` ensures users always see the latest version of the app immediately after deployment.

## Exceptions

- **Dynamic API Responses**: These usually require `no-store` or very short TTLs depending on the data.
- **Preview Environments**: Where caching might interfere with testing unfinalized changes.

## References

- [MDN: Cache-Control](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Cache-Control)
- [Web.dev: Love your cache](https://web.dev/articles/http-cache)
