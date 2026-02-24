# Prefer components over styling via classes or inline styles

Encapsulate design decisions into reusable components rather than creating reusable CSS classes.

## Problem

When developers try to achieve reusability by creating generic utility CSS classes (like `.p-4` or `.flex-center`) and applying them to HTML elements, the application structure becomes bloated with repetitive markup. If the design system logic needs to change (e.g., changing not just padding but also adding a structural wrapper for a specific layout type), a developer must hunt down every instance of those utility classes combined with HTML tags to make the structural change. CSS classes manage presentation, but they cannot manage HTML structure or behavior.

## Good solution

Build foundational layout and styling components (like `Box`, `Stack`, `Flex`, `Grid`) as part of your UI Kit. Pass props to these components to control spacing and layout. This allows you to encapsulate the HTML, the CSS, and any potential behavioral logic in one unified block.

```tsx
// Good: Encapsulating layout and spacing in a reusable component
import { Box, Text } from '@/ui-kit';

function UserProfile({ name }) {
  // The Box component handles the padding internally.
  return (
    <Box padding={4} background="surface">
      <Text variant="heading">{name}</Text>
    </Box>
  );
}
```

## Bad solution

Using raw HTML elements and attempting to control layout or spacing using a combination of inline styles or manual utility CSS classes.

```tsx
// Bad: Leaking formatting decisions via messy utility classes
import './utilities.css';

function UserProfile({ name }) {
  // Repeatedly writing verbose HTML tags equipped with CSS classes
  return (
    <div className="padding-xl bg-surface">
      <h1 className="text-heading">{name}</h1>
    </div>
  );
}
```

## Impact

- **[Maintainability](../../home/impact/positive/maintainability.md)**: When structural updates are required, maintaining a central `Box` component is much easier than updating raw `<div>` tags scattered everywhere.
- **[Explicitness](../../home/impact/positive/explicitness.md)**: Passing strongly-typed props to a React component is safer and more self-documenting than passing string-based CSS utility classes into `className`.
- **[Reusability](../../home/impact/positive/reusability.md)**: Components can inherently encapsulate behavioral state, aria attributes, and structural nested elements together with styling, whereas CSS classes can only handle presentation.

## Exceptions

- **UI Kit Implementation**: You are currently building the internal implementation of the UI Kit component itself (e.g., inside the source code for the actual `Box` component, where CSS or inline styles must act as the lowest-level primitive).
