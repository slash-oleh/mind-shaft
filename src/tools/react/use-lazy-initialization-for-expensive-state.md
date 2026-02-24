# Use lazy initialization for expensive state

Use the initializer function pattern (`useState(() => createInitialState())`) when the initial value of a state requires an expensive computation. This ensures the logic only runs once during the initial mount.

## Problem

React's `useState` accepts either a direct value or a function. If you pass an expensive function call directly (e.g., `useState(computeHeavily())`), that function will be executed **on every single render** of the component. While React only uses the result for the first render, the CPU cycles spent recalculating it on subsequent renders are entirely wasted. This can lead to noticeable performance degradation, especially in complex components or those that re-render frequently.

## Good solution

Pass a function (an "initializer") to `useState`. React will only invoke this function during the initial mount of the component and will ignore it on subsequent re-renders.

```tsx
// Good: 'loadDataFromStorage' only runs once
const [settings, setSettings] = useState(() => {
  return loadDataFromStorage('user-settings');
});
```

## Bad solution

Calling the expensive function directly inside the component body as an argument to `useState`.

```tsx
// Bad: 'loadDataFromStorage' runs on every render, wasting CPU
const [settings, setSettings] = useState(loadDataFromStorage('user-settings'));
```

## Impact

- **[Performance](../../home/impact/positive/performance.md)**: Prevents redundant, heavy calculations from blocking the main thread during re-renders.
- **[KISS](../../home/impact/positive/kiss.md)**: Provides a built-in React pattern for handling complex initialization without needing `useEffect`.

## Exceptions

- **Lightweight Values**: For simple values like strings, numbers, booleans, or small object literals, the overhead of creating a closure for lazy initialization is unnecessary. Just use `useState(0)` or `useState('')`.
