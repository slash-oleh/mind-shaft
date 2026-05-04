# Vector graphics

## TLDR

Always use SVG for icons and simple graphics. Avoid raster formats (PNG, JPG, WebP) for vector-like content. Good: `<svg>...</svg>`. Bad: `<img src="icon.png" />`.

## Problem

Raster icons lose quality on high-resolution displays. Scaling causes blurriness. Fixed dimensions lead to layout rigidity. Larger file size compared to simple vector paths.

## Good solution

SVG format for icons, logos, and geometric patterns. Infinite scalability without quality loss. Small bundle size. CSS styling support.

```html
<svg viewBox="0 0 24 24">
  <path
    d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"
    fill="currentColor"
  />
</svg>
```

## Bad solution

Using raster formats for scalable UI elements.

```html
<img
  src="/assets/icons/check.png"
  alt="Checkmark"
/>
```

## Impact

- **[Performance](../../home/impact/positive/performance.md)**: Vectors often smaller than equivalent raster assets.
- **[Usability](../../home/impact/positive/usability.md)**: Sharp graphics at any zoom level.
- **[Consistency](../../home/impact/positive/consistency.md)**: Unified styling and scaling behavior.

## Exceptions

- **Complex photos**: Raster formats (WebP, JPG) better for photos and complex continuous-tone images.
- **Detailed illustrations**: High point counts or complex gradients can make SVG larger than optimized raster versions.

## References

- [MDN: SVG by Mozilla Developers](https://developer.mozilla.org/en-US/docs/Web/SVG)
