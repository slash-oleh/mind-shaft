# Raster image optimization

## TLDR

Always use modern formats, responsive sizes, adaptive to actual viewport, lazy loading. Avoid large raw assets, unused trasparency data. Good: `<img src="img.webp" srcset="...">`. Bad: `<img src="original.png">`.

## Problem

Unoptimized images are often the largest contributor to a website's total download size. Serving high-resolution original files for small UI thumbnails or using legacy formats (like large PNGs or JPEGs) leads to slow page loads, high data consumption for mobile users, and poor performance metrics like Largest Contentful Paint (LCP). Additionally, loading all images immediately, including those far below the fold, wastes bandwidth and processing power on content the user might never see.

## Good solution

Implement a multi-layered strategy for image optimization:

- **Use Vectors frequently**: For icons and simple illustrations, use SVG to ensure perfect scaling at minimal file size.
- **Modern Formats**: Use WebP or AVIF for photographs to achieve better compression than JPEG or PNG at similar quality.
- **Responsive Resizing**: Serve images resized to their actual display dimensions. Don't serve a 4000px image if it's displayed in a 400px container.
- **Lazy Loading**: Use the native `loading="lazy"` attribute for non-critical images to defer their download until they are near the viewport.

```html
<!-- GOOD: Responsive, modern format with lazy loading -->
<picture>
  <source
    srcset="image-400.avif 400w, image-800.avif 800w"
    type="image/avif"
  />
  <source
    srcset="image-400.webp 400w, image-800.webp 800w"
    type="image/webp"
  />
  <img
    src="image-800.jpg"
    alt="Descriptive text"
    width="800"
    height="600"
    loading="lazy"
  />
</picture>
```

## Bad solution

Serving raw, original assets directly from a camera or design tool without processing.

```html
<!-- BAD: High-res original, legacy format, no lazy loading -->
<img
  src="original-camera-upload.png"
  alt="Product"
/>
<!-- This file might be 5MB and 5000px wide, even if displayed at 200px. -->
```

## Impact

- **Performance**: Speeding up page load by reducing the number of bytes transferred.
- **Size/Code Amount**: Directly reduces the payload size of the application.
- **User Experience**: Faster visual rendering and less data usage, especially critical for mobile users.
- **Scalability**: Reduces CDN egress costs and server load.

## Exceptions

- **Fine Art/High-Resolution Previews**: When the primary purpose of the site is to provide raw high-resolution downloads (e.g., a stock photo site's download page).
- **Extremely Small Thumbnails**: Where the overhead of multiple `<source>` tags exceeds the savings from format switching.

## References

- [MDN: Lazy loading](https://developer.mozilla.org/en-US/docs/Web/Performance/Lazy_loading)
- [Google: Squoosh.app](https://squoosh.app/)
