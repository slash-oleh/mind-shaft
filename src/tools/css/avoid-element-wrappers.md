# Avoid element wrappers

## TLDR

Minimize the use of wrapper elements like `<div>` or `<span>` to keep the DOM hierarchy flat.

## Problem

Excessive wrapping elements (often called "div soup") bloat the Document Object Model (DOM). A deep, complex DOM increases memory usage, slows down rendering performance, and complicates accessibility features. Furthermore, it makes writing and maintaining CSS much harder. Modern layout systems like Flexbox and Grid rely heavily on direct parent-child relationships; inserting meaningless wrapper layers breaks these relationships and forces developers to write hacky CSS to bypass the extra containers.

## Good solution

Apply layout and styling properties directly to the elements themselves whenever possible. Use modern CSS layout features (like `gap` in Flexbox/Grid) to space elements, and use semantic HTML or framework features (like React Fragments `<React.Fragment>` or `<></>`) to group elements without adding physical nodes to the DOM.

```tsx
// Good: Flat structure, utilizing fragments and direct styling
function Card({ title, content }) {
  return (
    <article className="card">
      <h2 className="title">{title}</h2>
      <p className="description">{content}</p>
    </article>
  );
}
```

## Bad solution

Wrapping elements in sterile `<div>` containers simply to apply margins, padding, or completely meaningless structural layers.

```tsx
// Bad: Redundant "div soup"
function Card({ title, content }) {
  return (
    <div className="card-wrapper">
      <div className="card-inner-container">
        <article className="card-content">
          <div className="title-wrapper">
            <h2 className="title">{title}</h2>
          </div>
          <div className="description-wrapper">
            <p className="description">{content}</p>
          </div>
        </article>
      </div>
    </div>
  );
}
```

## Impact

- **[KISS](../../home/impact/positive/kiss.md)**: A flatter HTML structure is significantly easier to understand, traverse, and debug in browser DevTools.
- **[Maintainability](../../home/impact/positive/maintainability.md)**: CSS rules remain clean and predictable without needing to target deeply nested selectors or bypass structural barriers.
- **[Readability](../../home/impact/positive/readability.md)**: Semantic intent is clearer when the code isn't drowned in meaningless structural `div` wrappers.

## Exceptions

- **Complex Layouts**: When absolutely necessary to execute a specific visual design, such as needing an inner wrapper to restrict content width while an outer wrapper provides a full-bleed background color.
- **Third-Party Integrations**: When a specific JavaScript library or plugin explicitly demands a dedicated wrapper element to mount onto.
