# Logic sharing

## TLDR

For sharing state and logic, always use custom Hooks. Avoid Higher-Order Components (HOCs), unless used for authentication guards or layout providers. Good: `const user = useAuth()`. Bad: `withAuth(Comp)`.

## Problem

Higher-Order Components rely on "prop injection," which creates several architectural issues:

- **Wrapper Hell**: Every HOC adds another layer to the React component tree, making it difficult to debug and inspect in DevTools.
- **Namespace Collisions**: If two HOCs inject a prop with the same name (e.g., `theme` or `data`), the second one will silently overwrite the first, leading to bugs that are hard to trace.
- **Obscured Data Flow**: Since props are injected "behind the scenes," it is not immediately clear where a specific prop is coming from when looking at the component's internal logic.
- **Static Typing Complexity**: In TypeScript, correctly typing HOCs is notoriously difficult and often requires complex generics that are hard to maintain.

## Good solution

Use custom hooks to access shared state or logic. This keeps the data flow explicit and internal to the component body, while keeping the component tree flat and easy to navigate.

```tsx
// Good: Explicit data flow via hooks
export const UserProfile = () => {
  const { user, isLoading } = useAuth(); // Source is clear
  const { theme } = useTheme(); // No collision possible

  if (isLoading) return <Loading />;
  return <div className={theme}>{user.name}</div>;
};
```

## Bad solution

Wrapping components in multiple HOCs, leading to a complex "prop-injection" chain.

```tsx
// Bad: Obscured prop sources and "wrapper hell"
const UserProfile = ({ user, isLoading, theme }) => {
  if (isLoading) return <Loading />;
  return <div className={theme}>{user.name}</div>;
};

// Which HOC provides which prop? Is 'theme' from withAuth or withTheme?
export default withTheme(withAuth(UserProfile));
```

## Impact

- **[Readability](../../home/impact/positive/readability.md)**: Hooks make the dependencies of a component explicit and visible within the component's function body.
- **[KISS](../../home/impact/positive/kiss.md)**: Eliminates the technical complexity of prop-injection patterns and complex HOC typing.

## Exceptions

- **Gatekeeping / Guards**: Cases where the underlying component should not render at all or must be wrapped for structural reasons. This includes **Authentication Guards** (e.g., `withAuthRequired`), **Routing logic**, or **Layout providers** where the outer layer must make a decision _before_ the inner component's logic is even invoked.
