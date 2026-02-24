# One component per file

Each file should export and focus on a single React component. This keeps your codebase modular, easy to navigate, and highly searchable.

## Problem

Files containing multiple components become increasingly difficult to manage as they grow. When multiple components share a file, it's harder to locate specific logic through file search, unit testing becomes more complex (as you're often forced to test multiple units at once), and it discourages reusability because a component is "trapped" inside another component's file. Over time, these files turn into "junk drawers" that violate the Single Responsibility Principle.

## Good solution

Keep each component in its own file named after the component itself (e.g., `Card.tsx`). If a component needs to be used in multiple places, it must have its own dedicated home.

```tsx
// Card.tsx
import { Title } from './Title';

export const Card = ({ children }) => {
  return (
    <div className="card">
      <Title>Card Title</Title>
      {children}
    </div>
  );
};

// Title.tsx
export const Title = ({ children }) => <h2>{children}</h2>;
```

## Bad solution

Packing multiple, unrelated, or significant components into a single file just to avoid creating new files.

```tsx
// Card.tsx - BAD: Multiple components defined in one place
export const Title = ({ children }) => <h2>{children}</h2>;

export const Header = () => <header>...</header>;

export const Card = ({ children }) => {
  return (
    <div className="card">
      <Header />
      <Title>Card Title</Title>
      {children}
    </div>
  );
};
```

## Impact

- **[Readability](../../home/impact/positive/readability.md)**: Developers can quickly understand what a file does just by looking at its name.
- **[Maintainability](../../home/impact/positive/maintainability.md)**: Smaller files are easier to refactor, debug, and navigate.
- **[Reusability](../../home/impact/positive/reusability.md)**: Makes it trivial to import any component anywhere in the project without bringing along unrelated code.

## Exceptions

- **Private Helpers**: You may define small, highly specific helper components within a file if they are used **only once** inside that specific file and are not useful elsewhere (e.g., a `ListRow` used only within a specific `List` component). Thus it shouldn't be exported. However, once that helper grows in complexity, it should be moved to its own file.
