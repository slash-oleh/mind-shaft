# Serializable state

## TLDR

For state and stores, always use serializable data like primitives, plain objects, and arrays. Avoid storing functions, Promises, or Classes. Good: `const [q, setQ] = useState("")`. Bad: `const [element, setElement] = useState(() => <Button />)`.

## Problem

Storing non-serializable data (like functions, Promises, or Classes) in state breaks several core development and production features. It prevents you from using "Time-Travel Debugging" in tools like Redux DevTools, as the state cannot be captured or replayed. It also makes state persistence (e.g., saving to `localStorage` or URL parameters) and Server-Side Rendering (SSR) hydration impossible, leading to "mismatched content" errors. Furthermore, React is optimized to compare plain data; comparing complex objects or functions in state can lead to unexpected re-renders or stale closure bugs.

## Good solution

Keep state as "pure data." If you need a function that depends on certain values, use `useCallback` or `useMemo` to create a stable reference during the render cycle rather than storing it in a `useState` hook.

```tsx
// Good: State is a simple string; function is a stable reference via useCallback
function SearchComponent({ id }) {
  const [query, setQuery] = useState('');

  const handleSearch = useCallback(() => {
    return api.get(`/search?q=${query}&id=${id}`);
  }, [query, id]);

  return <button onClick={handleSearch}>Search</button>;
}
```

## Bad solution

Attempting to store a function or a complex instance directly in a state variable.

```tsx
// Bad: Storing a function in state is redundant and breaks serializability
function SearchComponent({ id }) {
  const [handleSearch, setHandleSearch] = useState();

  useEffect(() => {
    // This is unnecessary and makes the state non-serializable
    setHandleSearch(() => () => {
      return api.get(`/search?id=${id}`);
    });
  }, [id]);

  return <button onClick={handleSearch}>Search</button>;
}
```

## Impact

- **Robustness**: Ensures the application can be safely persisted to storage or hydrated from a server-rendered string.
- **KISS**: Maintains a clear conceptual boundary between "data" (the state) and "logic" (the functions that operate on it).

## Exceptions

- **Ref escape hatches**: If you _must_ store a non-serializable value (like a `setInterval` ID, a third-party library instance, or a DOM reference), use `useRef` instead of `useState`. Refs are intended for imperative "side-data" and do not affect the serializability of the component's UI state.
