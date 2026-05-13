# Padding

## TLDR

Always use padding on containers for internal space. Avoid margins on child elements. Good: `<div style={{ padding: '24px' }}><h1/></div>`. Bad: `<div><h1 style={{ margin: '24px' }}></div>`.

## Problem

Margins push outwards, affecting the layout spacing outside of the element's actual structural box. This causes layout unpredictability, especially due to CSS "margin collapsing" (where top and bottom margins of adjacent elements mysteriously merge into one, or margins push out past a parent element). Furthermore, click boundaries and hit targets (like on links or buttons) do not extend into margins, making interactive elements harder for users to tap. Padding pushes inwards, creating reliable, predictable space that extends the element's background and hit area.

## Good solution

Apply padding to the parent container to create inward space around children, or use `gap` in Flexbox/Grid systems to create space _between_ children without using margins.

```tsx
// Good: The parent container uses padding to establish internal space from the edges.
// Interactive elements use padding to expand their clickable hit targets.
function DialogBox() {
  return (
    <div style={{ padding: '24px', background: 'white' }}>
      <h1>Title</h1>
      <p>Content goes here.</p>
      {/* Button expands its clickable area cleanly */}
      <button style={{ padding: '12px 24px', background: 'blue' }}>
        Confirm
      </button>
    </div>
  );
}
```

## Bad solution

Applying margins to child elements to push them away from the edges of a container, risking margin collapse.

```tsx
// Bad: The parent has no padding, children are manually pushing themselves away using margins
function DialogBox() {
  return (
    <div style={{ background: 'white' }}>
      <h1 style={{ marginTop: '24px', marginLeft: '24px' }}>Title</h1>
      <p style={{ marginLeft: '24px', marginBottom: '24px' }}>
        Content goes here.
      </p>
      {/* A padded button is better, but margin creates dead non-clickable space */}
      <button style={{ margin: '12px 24px', background: 'blue' }}>
        Confirm
      </button>
    </div>
  );
}
```

## Impact

- **Usability**: Padding actively increases the geometric hit-box of clickable zones, significantly improving touch targets on mobile devices.
- **Maintainability**: Centralizing spacing onto parent containers via padding (and `gap`) keeps layout logic gathered in one place, rather than scattered across the margins of many individual children.

## Exceptions

- **Centering Block Elements**: Using `margin: 0 auto;` remains the standard method for horizontally centering a fixed-width block element inside a wider container.
- **Global Typography Roots**: Applying bottom margins to base typographic tags (like `p`, `h1`, `ul`) in a global reset is often accepted to provide natural reading rhythm when simple text elements flow sequentially inside an article.
