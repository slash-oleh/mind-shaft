# Avoid `useRef` for state management

Favor declarative state (`useState`) over imperative refs. Use `useRef` only as a last resort for direct DOM access or for manual performance optimizations that don't affect the rendered UI.

## Problem

`useRef` is an escape hatch that bypasses the React render cycle. Updating a ref's `.current` property does not trigger a re-render, which often leads to the UI becoming desynchronized from the actual data. Indiscriminate use of refs leads to imperative code that is difficult to debug, hard to test, and violates React's "data down, actions up" philosophy.

## Good solution

Use `useState` for any data that should reflect in the UI. For interaction with children, use callback props or lifting state up rather than imperative methods.

```tsx
// Good: UI state is declarative and triggers updates
function SearchForm() {
  const [query, setQuery] = useState('');

  return (
    <form onClear={() => setQuery('')}>
      <input
        value={query}
        onChange={e => setQuery(e.target.value)}
      />
      <p>Searching for: {query}</p>
    </form>
  );
}
```

## Bad solution

Storing UI-relevant data in a ref to avoid re-renders or to "cheat" the React flow.

```tsx
// Bad: UI is out of sync with data because refs don't trigger re-renders
function SearchForm() {
  const queryRef = useRef('');

  const handleInput = (e) => {
    queryRef.current = e.target.value;
    // UI below will NOT update as user types!
  };

  return (
    <form>
      <input onChange={handleInput} />
      <p>Searching for: {queryRef.current}</p>
    </form>
  );
}
```

## Why

- **[Consistency](../../home/quality-attributes/positive/consistency.md)**: State ensures the UI always correctly reflects the underlying data model.
- **[KISS](../../home/quality-attributes/positive/kiss.md)**: Declarative code ("If data is X, render Y") is significantly easier to reason about than tracking imperative mutations.
- **[Explicitness](../../home/quality-attributes/positive/explicitness.md)**: Re-renders make side effects and data flow visible and predictable through standard React debugging tools.

## Exceptions

- **Direct DOM Access**: When you must call native browser APIs that are impossible via props (e.g., `.focus()`, `.scrollIntoView()`, `.play()` on a video element).
- **External Library Integration**: Coordinating with imperative non-React libraries (e.g., D3, Google Maps).
- **Internal Bookkeeping**: Storing values that *never* affect rendering or effects (e.g., `setInterval` IDs, previous prop values for manual comparison).
- **Critical Optimizations**: In extremely rare, high-frequency scenarios where re-rendering on every small data change would cause frame drops (e.g., a high-perf canvas animation controller).
