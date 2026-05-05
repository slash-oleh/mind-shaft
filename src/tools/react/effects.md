# Effects

## TLDR

For side effects, always prefer event handlers or render-cycle logic. Use useEffect only to synchronize with external systems outside of React. Avoid `useEffect` for computed state, React state synchronization, or resetting and in general if possible. Good: `const total = items.length`. Bad: `useEffect(() => setTotal(items.length), [items])`.

## Problem

Overuse of `useEffect` fragments logic, creates race conditions, and triggers redundant render cycles. Effects run after render, causing visual jumps or stale UI. Synchronizing props to local state creates duplicate sources of truth, making components fragile and hard to test.

## Good solution

Calculate values during render (computed state). Use event handlers for imperative actions. Apply `key` prop for state resets.

```tsx
// Good: Computed state during render
function Search({ query, items }) {
  const filtered = useMemo(
    () => items.filter((i) => i.name.includes(query)),
    [items, query],
  );
  return <List items={filtered} />;
}

// Good: State reset via key
function Profile({ id }) {
  // Key change triggers full remount, resetting internal state
  return (
    <ProfileDetail
      key={id}
      userId={id}
    />
  );
}
```

## Bad solution

Syncing state via effects or mirroring props in `useState`.

```tsx
// Bad: Manual sync via effect
function Search({ query, items }) {
  const [filtered, setFiltered] = useState([]);
  useEffect(() => {
    setFiltered(items.filter((i) => i.name.includes(query)));
  }, [items, query]);
  return <List items={filtered} />;
}

// Bad: Prop mirroring with side effect sync
function UserForm({ user }) {
  const [name, setName] = useState(user.name);
  useEffect(() => setName(user.name), [user.name]);
  return (
    <input
      value={name}
      onChange={(e) => setName(e.target.value)}
    />
  );
}
```

## Impact

- **[Consistency](../../home/impact/positive/consistency.md)**: Single source of truth prevents synchronization bugs.
- **[Performance](../../home/impact/positive/performance.md)**: Eliminates redundant render cycles and effect overhead.
- **[Robustness](../../home/impact/positive/robustness.md)**: Unidirectional data flow simplifies testing and debugging.

## Exceptions

- **External systems**: Browser APIs, manual DOM mutations, document title.
- **Logging**: Non-visual side effects (analytics).
- **Subscriptions**: WebSockets or event listeners (with proper cleanup).

## References

- [React: You Might Not Need an Effect](https://react.dev/learn/you-might-not-need-an-effect)
- [React: Synchronizing with Effects](https://react.dev/learn/synchronizing-with-effects)
