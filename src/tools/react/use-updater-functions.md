# Use updater functions

## TLDR

Use updater functions when state depends on its previous value. Avoid referencing stale state variables inside setters.

## Problem

React state updates are asynchronous and batched. If you reference the state variable directly within an update (e.g., `setCount(count + 1)`), you are relying on the value of `count` from the current render cycle. If multiple updates are triggered before the next render (such as multiple calls in a single event handler or updates within a closure like `setTimeout`), they will all reference the same "stale" value. This results in lost updates, where only the last operation "wins" or the calculations are simply incorrect.

## Good solution

Pass a function to the state setter. React will call this function with the latest, most up-to-date state value, ensuring that every transition is applied correctly on top of the previous one.

```tsx
// Good: Every click correctly increments the count by 3
const handleTripleIncrement = () => {
  setCount(prev => prev + 1);
  setCount(prev => prev + 1);
  setCount(prev => prev + 1);
};
```

## Bad solution

Directly referencing the state variable for the new value, which leads to stale closures and lost updates.

```tsx
// Bad: All calls use the same 'count' value from the current render
// Result: Count only increases by 1, regardless of how many times you call it
const handleTripleIncrement = () => {
  setCount(count + 1);
  setCount(count + 1);
  setCount(count + 1);
};
```

## Impact

- **[Consistency](../../home/impact/positive/consistency.md)**: Guarantees that the update logic always operates on the literal "current" state, preventing data loss.
- **[Performance](../../home/impact/positive/performance.md)**: Leverages React's **Automatic Batching**. While React 18+ batches multiple state updates into a single render by default, functional updates ensure that multiple updates to the *same* state within that single batch are cumulative rather than overwriting each other.
- **[Reliability](../../home/impact/positive/reliability.md)**: Solves stale closure issues in asynchronous callbacks (like `setTimeout` or `Promise.then`) without needing to add the state variable to dependency arrays in complex ways.

## Exceptions

- **Independent Updates**: If the next state is completely independent of the previous one (e.g., setting a value from an input field or an API response), you can pass the value directly: `setUserName(event.target.value)`.
