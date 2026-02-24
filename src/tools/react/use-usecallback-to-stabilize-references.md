# Use `useCallback` to stabilize references

## TLDR

Use the `useCallback` hook to maintain a stable reference for a function across re-renders. This is primarily used to prevent unnecessary re-renders of memoized child components and to provide stable dependencies for other hooks.

## Problem

In React, functions defined inside a component are recreated on every render. If these functions are passed as props to a child component wrapped in `React.memo`, the child will re-render every time because it receives a "new" function reference. This negates the performance benefits of memoization. Additionally, using an unstable function reference in the dependency array of a `useEffect` or another hook can trigger infinite loops or redundant effect executions.

A common myth is that `useCallback` "prevents function creation" to save memory. This is false. A function expression (like `() => {}`) is still evaluated and created as a new object on every render before it is passed as an argument to `useCallback`. The hook's role is to decide whether to return the *previously stored* version of the function or the *new* one. Use it for **referential stability**, not for optimizing the cost of function creation itself.

## Good solution

Wrap any function that is passed as a prop to a memoized child or used as a dependency in another hook with `useCallback`. This ensures the reference only changes when the hook's actual dependencies change.

```tsx
// Good: handleUpdate has a stable reference for the memoized child
const Parent = () => {
  const [count, setCount] = useState(0);

  const handleUpdate = useCallback(() => {
    console.log("Submitting...");
  }, []); // Dependencies are empty, so reference stays the same

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(c => c + 1)}>Increment</button>
      <MemoizedChild onUpdate={handleUpdate} />
    </div>
  );
};
```

## Bad solution

Defining callbacks inline when passing them to memoized components or including unstable references in hook dependency arrays.

```tsx
// Bad: Inline function breaks MemoizedChild's performance optimization
const Parent = () => {
  const [count, setCount] = useState(0);

  return (
    <div>
      <button onClick={() => setCount(c => c + 1)}>Increment</button>
      {/* Re-renders MemoizedChild on every click because of the new arrow function */}
      <MemoizedChild onUpdate={() => console.log("Submitting...")} />
    </div>
  );
};
```

## Impact

- **[Performance](../../home/impact/positive/performance.md)**: Vital for making `React.memo` effective by ensuring props remain referentially equal between renders.
- **[Robustness](../../home/impact/positive/robustness.md)**: Prevents `useEffect` from re-running unnecessarily when the callback logic itself hasn't changed.

## Exceptions

- **Native HTML Elements**: You generally don't need `useCallback` for standard DOM elements like `<button onClick={...}>` or `<input onChange={...}>`. They do not benefit from referential stability, and the overhead of the hook is often more expensive than the simple re-render of the DOM node.
- **Non-Memoized Components**: If the child component is not memoized, it will re-render when the parent does regardless of whether the callback is stable or not.
