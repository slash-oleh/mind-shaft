# Avoid pure HTML elements

## TLDR

Encapsulate raw HTML elements like `<div>` or `<button>` into reusable UI Kit primitives instead of using them directly in application pages.

## Problem

Using raw HTML tags directly in business logic components leads to unstyled, inaccessible, and inconsistent user interfaces. Every time a raw tag is instantiated, developers implicitly assume the responsibility for manually adding accessibility attributes (ARIA), typography styles, structural classes, and event tracking. If the design system needs to apply a global behavior (such as enforcing a specific focus-ring on all interactive elements, or tracking analytics on every outward link), developers must hunt down and manually update hundreds of scattered `<a>` or `<button>` tags across the codebase.

## Good solution

Create a foundational UI Kit that encapsulates the raw HTML tags once, attaching your design tokens, standard behaviors, and accessibility requirements. Compose your application exclusively out of these primitives.

```tsx
// Good: Using encapsulated UI token primitives
import { Box, Typography, Link } from '@/ui-kit';

function UserProfile({ user }) {
  return (
    <Box padding={4} borderRadius="md" background="surface">
      <Typography variant="heading">{user.name}</Typography>
      <Link href={user.websiteUrl} isExternal>Visit Website</Link>
    </Box>
  );
}
```

## Bad solution

Littering the application code with raw HTML blocks, manually rebuilding layout and typography semantics each time.

```tsx
// Bad: Using raw HTML tags and assuming responsibility for all styling and a11y
function UserProfile({ user }) {
  return (
    <div className="bg-white p-4 rounded-md">
      <span className="text-xl font-bold">{user.name}</span>
      <a href={user.websiteUrl} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
        Visit Website
      </a>
    </div>
  );
}
```

## Impact

- **[Consistency](../../home/impact/positive/consistency.md)**: Encapsulating HTML ensures global design tokens (like focus states, default link colors, and typography scaling) are applied uniformly everywhere.
- **[Maintainability](../../home/impact/positive/maintainability.md)**: If a global change is required (like adding an analytics tracker to all external links), you only modify the `<Link>` primitive inside the UI Kit, rather than refactoring 500 individual `<a>` tags.
- **[Robustness](../../home/impact/positive/robustness.md)**: Centralizing the HTML elements drastically reduces the risk of developers forgetting critical security or accessibility attributes (like `rel="noopener noreferrer"` on blank targets).

## Exceptions

- **The UI Kit itself**: The foundational components within the UI Design System are the literal designated places where raw HTML tags *must* be used and encapsulated.
- **Third-Party Integrations**: Specific external libraries or charting tools that explicitly require an empty raw `<div>` with an `id` to mount a canvas or iframe onto.
