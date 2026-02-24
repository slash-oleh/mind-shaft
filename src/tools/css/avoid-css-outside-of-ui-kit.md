# Avoid CSS outside of UI kit

## TLDR

Use custom CSS exclusively to implement primitive components within your Design System (UI Kit). For higher-level business components and pages, compose existing UI components rather than writing low-level CSS.

## Problem

Writing raw CSS in high-level business components or pages leads to inconsistent designs, duplicated code, and tightly-coupled styling. When designers update brand guidelines or design tokens (like primary colors or spacing rules), finding and changing scattered CSS across dozens of pages becomes a maintenance nightmare. Furthermore, developers spend unnecessary time writing CSS to reinvent layouts instead of focusing on business logic.

## Good solution

Create a dedicated UI Kit consisting of primitive layout and design components (e.g., `Button`, `Card`, `Stack`, `Grid`). Encapsulate all raw CSS within these primitives. Build business features exclusively by composing them together.

```tsx
// Good: Composing UI Kit primitives without writing custom CSS
import { Stack, Text, Button, Card } from '@/ui-kit';

function UserProfile({ user }) {
  return (
    <Card padding="large">
      <Stack direction="column" spacing="medium">
        <Text variant="heading">{user.name}</Text>
        <Text variant="body">{user.bio}</Text>
        <Button variant="primary">Edit Profile</Button>
      </Stack>
    </Card>
  );
}
```

## Bad solution

Writing custom CSS classes or inline styles directly on UI Kit primitives to bypass or override their design system constraints.

```tsx
// Bad: Using UI Kit components but overriding them with bespoke inline styles and custom classes
import './UserProfile.css';
import { Stack, Text, Button, Card } from '@/ui-kit';

function UserProfile({ user }) {
  return (
    <Card className="user-profile-custom-card" style={{ padding: '24px' }}>
      <Stack direction="column" style={{ gap: '16px' }}>
        <Text variant="heading" style={{ fontSize: '28px', color: '#333' }}>
          {user.name}
        </Text>
        <Text variant="body" className="tight-leading">
          {user.bio}
        </Text>
        <Button variant="primary" style={{ marginTop: '8px', background: 'blue' }}>
          Edit Profile
        </Button>
      </Stack>
    </Card>
  );
}
```

## Impact

- **[Consistency](../../home/impact/positive/consistency.md)**: Ensures the entire application looks uniform and perfectly adheres to the design system constraints.
- **[Maintainability](../../home/impact/positive/maintainability.md)**: Design changes (like altering a spacing scale) only need to be updated in one primitive UI Kit component to propagate across the entire app.
- **[Reusability](../../home/impact/positive/reusability.md)**: Developers can rapidly build new pages by snapping together pre-styled components without writing CSS from scratch.

## Exceptions

- **Complex Visualizations**: Highly specific, isolated one-off components like complex canvas-based interactive graphs, charting libraries, or 3D scenes that fundamentally cannot be composed from standard UI Kit primitives.
