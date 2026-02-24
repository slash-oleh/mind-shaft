# Use useMemo for stability and expensive logic

## TLDR

Use `useMemo` to cache results of expensive calculations and maintain referential stability for complex objects and arrays passed to downstream components.

## Problem

Many developers avoid `useMemo` because they fear the memory overhead of caching values or believe that modern JavaScript is fast enough that re-calculating objects is trivial. However, the real cost of **referential instability** is often overlooked. If a component re-calculates an object or array on every render, and that object is passed as a dependency to a hook or a prop to a `React.memo` component, it triggers a chain reaction of unnecessary re-renders. The minor memory sacrifice of `useMemo` is often a worthwhile trade-off for the significant performance gains of stable references.

## Good solution

Use `useMemo` for any complex object, array, or intensive calculation that is passed downstream. This ensures referential stability and prevents the "memoization breakage" of child components.

```tsx
// Good: Stable reference prevents 'Chart' from re-rendering
export const Dashboard = ({ data }) => {
  const chartOptions = useMemo(() => ({
    title: 'Monthly Revenue',
    data: data.map(d => d.value),
    theme: 'dark'
  }), [data]);

  return <DeeplyMemoizedChart options={chartOptions} />;
};
```

## Bad solution

Re-creating objects or performing heavy logic directly in the render body. This renders `React.memo` on child components useless because their props always fail the shallow equality check.

```tsx
// Bad: New object reference created on every render
export const Dashboard = ({ data }) => {
  const chartOptions = {
    title: 'Monthly Revenue',
    data: data.map(d => d.value),
    theme: 'dark'
  };

  return <DeeplyMemoizedChart options={chartOptions} />;
};
```

## Impact

- **[Performance](../../home/impact/positive/performance.md)**: Stabilizing references is critical for making `React.memo` effective.
- **[Robustness](../../home/impact/positive/robustness.md)**: Sacrificing a small amount of memory for a cache is often the correct architectural decision to ensure a smooth, lag-free UI.

## Exceptions

- **Lightweight primitives**: Don't use `useMemo` for basic strings, numbers, or booleans as they are compared by value, not reference.
- **Simple JSX**: Memoizing small fragments of JSX is usually more expensive than letting React handle the virtual DOM diffing.

## References

- [YouTube: The Performance Trade-offs of useMemo](https://www.youtube.com/watch?v=THL1OPn72vo)

  > What's not obvious is that we sometimes ready to sacrifice some memory in favor of stable refs for better resulting performance. So useMemo seems bad but result is better in the end. And in reality that's quite a more frequent case that it can seem to be.
