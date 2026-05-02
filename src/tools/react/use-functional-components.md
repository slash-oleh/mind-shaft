# Functional components

## TLDR

Always use functional components with Hooks. Avoid Class components, unless maintaining legacy code or implementing Error Boundaries. Good: `const Comp = () => {}`. Bad: `class Comp extends React.Component {}`.

## Problem

Class components are significantly more verbose than functional components, requiring boilerplate like `constructor(props)` and `this` binding. More importantly, they suffer from a **lack of logical cohesion**. In a class component, related logic is often split across multiple lifecycle methods (e.g., setting up a subscription in `componentDidMount` and tearing it down in `componentWillUnmount`). This makes the component harder to reason about and refactor. Class components are also harder for tools like terser to minify effectively.

## Good solution

Use functional components. They are simple JavaScript functions that accept props and return JSX. Logic can be grouped together using the `useEffect` hook, keeping setup and cleanup code in the same block.

```tsx
// Good: Concise and cohesive logic
export const UserStatus = ({ userId }: { userId: string }) => {
  const [isOnline, setIsOnline] = useState(false);

  useEffect(() => {
    // Subscription logic stays together
    const unsubscribe = ChatAPI.subscribe(userId, (status) => {
      setIsOnline(status.isOnline);
    });
    return () => unsubscribe();
  }, [userId]);

  return <div>{isOnline ? 'Online' : 'Offline'}</div>;
};
```

## Bad solution

Using class components, which split related business logic across disconnected lifecycle methods.

```tsx
// Bad: Logic for 'userId' subscription is split across three methods
class UserStatus extends React.Component {
  state = { isOnline: false };

  componentDidMount() {
    this.subscribeToChat();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.userId !== this.props.userId) {
      this.unsubscribeFromChat();
      this.subscribeToChat();
    }
  }

  componentWillUnmount() {
    this.unsubscribeFromChat();
  }

  // ... helper methods for subscription ...
}
```

## Impact

- **[KISS](../../home/impact/positive/kiss.md)**: Functional components are just functions. They eliminate the confusion of `this` and the boilerplate of classes.
- **[Cohesion](../../home/impact/positive/cohesion.md)**: Hooks allow you to group related code by what it's doing (e.g., a subscription) rather than when it's happening (lifecycle).
- **[Readability](../../home/impact/positive/readability.md)**: Resulting code is shorter and follows a more declarative pattern.

## Exceptions

- **Error Boundaries**: As of current React versions, you must use a class component if you need to implement `getDerivedStateFromError` or `componentDidCatch`.
- **Legacy Code**: Maintenance of existing class-based codebases where refactoring isn't prioritized.
