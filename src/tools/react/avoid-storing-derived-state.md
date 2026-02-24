# Avoid storing derived state

Do not store calculated or derived values in state or external stores. Instead, calculate them on‑the‑fly during rendering.

## Problem

Storing derived values (e.g., a filtered list, a total count, or a formatted string) in a separate state creates "duplicate sources of truth." This requires manual synchronization (usually via `useEffect`) which is error-prone and often leads to the UI being one step behind or completely out of sync with the base data. In complex components, you should calculate these values during the render cycle. Use `useMemo` for expensive calculations (like heavy data processing) to avoid redundant work, but keep lightweight one-liners as plain variables to avoid the overhead of the hook itself.

## Good solution

Calculate the derived value directly within the component's body during the render cycle. If the calculation is computationally expensive, wrap it in `useMemo`.

```tsx
// Good: Derived values calculated in real-time
function ShoppingCart({ items }) {
  // Use useMemo for potentially expensive calculations
  const totalPrice = useMemo(() => {
    return items.reduce((sum, item) => sum + item.price, 0);
  }, [items]);

  // Keep lightweight calculations as simple variables
  const itemCount = items.length;

  return (
    <div>
      <p>Items: {itemCount}</p>
      <p>Total: ${totalPrice}</p>
    </div>
  );
}
```

## Bad solution

Using `useState` and `useEffect` to manually sync a derived value with its source data.

```tsx
// Bad: Multiple sources of truth requiring manual sync
function ShoppingCart({ items }) {
  const [totalPrice, setTotalPrice] = useState(0);

  // Redundant effect, prone to bugs and extra re-renders
  useEffect(() => {
    setTotalPrice(items.reduce((sum, item) => sum + item.price, 0));
  }, [items]);

  return <p>Total: ${totalPrice}</p>;
}
```

## Why

- **[Consistency](../../home/quality-attributes/positive/consistency.md)**: A single source of truth guarantees that calculations are always perfectly in sync with the source data.
- **[KISS](../../home/quality-attributes/positive/kiss.md)**: Eliminating redundant `useState` and `useEffect` hooks makes the component much easier to read and test.
- **[Maintainability](../../home/quality-attributes/positive/maintainability.md)**: Refactoring becomes safer when you don't have to worry about updating manual synchronization logic.

## Exceptions

- **Expensive Computations**: If a calculation is very heavy (e.g., complex data processing or large array manipulations), use `useMemo` to cache the result between renders.
- **External API Requirements**: When an external, imperative library (e.g., a charting tool) requires a persistent reference that only changes under specific conditions.
