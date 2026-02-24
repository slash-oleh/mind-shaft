# Don't wrap interactive elements into each other

Avoid nesting interactive elements (buttons, links, inputs) inside other interactive elements. This creates ambiguous click targets and unpredictable behavior, especially for keyboard and screen-reader users.

## Problem

When a button or link contains another interactive element, users don't know which element will receive the click. A button inside a link might trigger the link's navigation or the button's action, depending on where the user clicks. This ambiguity is confusing and violates the principle of least surprise.

## Good solution

Keep interactive elements separate and clearly delineated. If an action needs to be performed on an item that is also a link, use a layout that distinguishes the two, such as a button placed next to the link or a button within a toolbar associated with the item.

```jsx
// Good: The link and button are siblings, not nested.
<div>
  <Link href="/item/123">View Item 123</Link>
  <Button variant="outline" size="sm" onClick={() => handleDelete(123)}>
    Delete
  </Button>
</div>
```

```jsx
// Good: Using a list item with a clear action area.
<ListItem>
  <ListItemText primary="Item 123" />
  <ListItemSecondaryAction>
    <Button variant="ghost" size="sm" onClick={() => handleDelete(123)}>
      Delete
    </Button>
  </ListItemSecondaryAction>
</ListItem>
```

## Bad solution

Nesting a button inside a link or another interactive element.

```jsx
// Bad: The button is inside the link, making it unclear which element activates.
<Link href="/item/123">
  View Item 123
  <Button variant="ghost" size="sm" onClick={() => handleDelete(123)}>
    Delete
  </Button>
</Link>
```

```jsx
// Bad: A button inside a list item that is also a link.
<ListItem button component={Link} to="/item/123">
  <ListItemText primary="Item 123" />
  <Button variant="ghost" size="sm" onClick={() => handleDelete(123)}>
    Delete
  </Button>
</ListItem>
```

## Why

- **[Usability](../../home/quality-attributes/positive/usability.md)**: Users should never have to guess which element will respond to their click. Clear separation reduces cognitive load and prevents errors.
- **[Accessibility](../../home/quality-attributes/positive/accessibility.md)**: Nested interactive elements confuse screen readers and keyboard navigation. A user tabbing through the page might activate the outer element (e.g., navigate away) when they intended to activate the inner one (e.g., delete an item).
- **[Explicitness](../../home/quality-attributes/positive/explicitness.md)**: The interface should clearly communicate the boundaries of interactive regions. Nesting blurs these boundaries.

## Exceptions

- **Implicitly Interactive Components**: Some components, like `ListItem` with `button` prop, are designed to be interactive as a whole. However, even in these cases, actions that modify the item (like delete) should be visually distinct and not rely on the user clicking inside the main link area.
