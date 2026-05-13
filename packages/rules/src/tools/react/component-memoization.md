# Component memoization

## TLDR

Always wrap functional components in `memo`. Avoid redundant re-renders due to parent re-renders unless using React Compiler. Good: `const Comp = memo(() => {})`. Bad: `const Comp = () => {}`.

## Problem

In React, a child component re-renders every time its parent re-renders, even if the child's props haven't changed. While individual re-renders may be fast, they accumulate in large applications, leading to noticeable lag and jank. The standard advice to "measure before optimizing" is often too vague and subjective for day-to-day development. Developers frequently miss optimization opportunities, or spend too much time debating whether a component is "heavy enough" to warrant memoization. This results in inconsistent performance and a higher maintenance burden.

Misconception: A common fear is that `memo` "caches" data and clutters memory. This is incorrect. `memo` is effectively a functional equivalent of `shouldComponentUpdate`. It doesn't store a massive history of renders; it only stores a reference to the **previous props** to perform a shallow comparison with the **current props**. The memory overhead is negligible compared to the CPU cycles saved by avoiding unnecessary renders.

## Good solution

Wrap every functional component in `memo` by default. This ensures that the component only re-renders if its props have actually changed, making the application's performance characteristics more robust and predictable.

```tsx
// Good: Component is protected from unnecessary parent re-renders
export const UserCard = memo(({ name, role }: UserCardProps) => {
  return (
    <div className="card">
      <h3>{name}</h3>
      <p>{role}</p>
    </div>
  );
});
```

## Bad solution

Leaving components as plain functions without memoization, leaving them vulnerable to redundant execution cycles.

```tsx
// Bad: This component will re-render every time its parent does
export const UserCard = ({ name, role }: UserCardProps) => {
  return (
    <div className="card">
      <h3>{name}</h3>
      <p>{role}</p>
    </div>
  );
};
```

## Impact

- **Performance**: Prevents redundant virtual DOM diffing and execution logic across the entire tree.
- **KISS**: Removes the "vague and subjective" decision-making process of when to optimize. A consistent rule is easier to follow than ad-hoc measurements.

## Exceptions

- **Components that _must_ re-render on parent render**: Very rare cases where a component depends on non-prop, non-state external triggers for visual updates.
- **Breaking changes**: React hasn't made this the default behavior primarily because it would be a breaking change for existing projects, not because it's a bad pattern for new ones.

## References

- [React: memo Reference Documentation](https://react.dev/reference/react/memo)

  > There is no benefit to wrapping a component in memo in other cases.
  > **There is no significant harm to doing that either, so some teams choose
  > to not think about individual cases, and memoize as much as possible.**
  > The downside of this approach is that code becomes less readable.
  > Also, not all memoization is effective: a single value that’s “always new”
  > is enough to break memoization for an entire component.

- [StackOverflow: Should all functional components be wrapped in React.memo?](https://stackoverflow.com/a/63405621)

  > You should always use React.memo LITERALLY, as comparing the tree returned by the Component is always more expensive than comparing a pair of props properties
  > So don't listen to anyone and wrap ALL functional components in React.memo. React.memo was originally intended to be built into the core of functional components, but it is not used by default due to the loss of backward compatibility.
