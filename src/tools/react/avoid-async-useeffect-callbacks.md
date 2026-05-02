# Async effects

## TLDR

For `useEffect` with async calls, always define self-called function inside. Never make effect callback itself `async`. Good: `useEffect(() => { (async () => {})() }, [])`. Bad: `useEffect(async () => {}, [])`.

## Problem

The `useEffect` hook expects its return value to be either `undefined` or a cleanup function. Because `async` functions implicitly return a `Promise`, React cannot use them as effects. This creates two major issues:

1. **Broken Cleanups**: You cannot return a cleanup function (to unsubscribe from listeners or cancel requests) because the hook receives a Promise instead of the function.
2. **Race Conditions**: Without a proper cleanup to set an "ignored" flag, multiple async requests can resolve out of order, leading to the UI displaying stale or incorrect data.

## Good solution

Define a nested async function inside the effect and call it. This allows you to still return a proper synchronous cleanup function.

```tsx
// Good: Nested async function with a cleanup flag
useEffect(() => {
  let isIgnored = false;

  async function fetchData() {
    const data = await api.get('/user');
    if (!isIgnored) {
      setUser(data);
    }
  }

  fetchData();

  return () => {
    isIgnored = true;
  };
}, [id]);
```

## Bad solution

Applying the `async` keyword directly to the effect callback.

```tsx
// Bad: Returns a Promise, breaking React's cleanup mechanism
useEffect(async () => {
  const data = await api.get('/user');
  setUser(data);

  // This return is ignored/broken because it's wrapped in a Promise
  return () => cleanup();
}, [id]);
```

## Impact

- **[Consistency](../../home/impact/positive/consistency.md)**: Adheres to the React core team's specifications and prevents internal framework warnings.
- **[Robustness](../../home/impact/positive/robustness.md)**: Encourages the use of "ignore" flags or AbortControllers to prevent data race conditions.

## Exceptions

- None. Always use an internal async function or a dedicated data-fetching library.
