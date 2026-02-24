# Use stable, unique keys in lists

## TLDR

Ensure that the `key` prop used in lists is both unique among siblings and stable across re-renders. Favor unique data IDs over array indices for dynamic collections.

## Problem

The `key` prop is React's primary mechanism for tracking identity in a collection. Two major misconceptions lead to broken UIs:

1. **Unstable Keys**: Using `Math.random()` or a timestamp as a key. This forces React to destroy and recreate the entire list on every render, causing immediate loss of input focus and massive performance drops.
2. **Reordered Index Keys**: Using the array `index` as a key for a list that can be sorted, filtered, or modified. When items move, React sees the same "key" (the index) at the same position and tries to reuse the existing DOM/state for a *different* piece of data, leading to "ghost" values appearing in inputs or broken animations.

## Good solution

Use a unique and persistent identifier from your data (like an `id` or `uuid`) as the key. This ensures the key remains tied to the specific piece of data regardless of its position in the array.

```tsx
// Good: Using a stable data ID
<ul>
  {users.map(user => (
    <li key={user.id}>{user.name}</li>
  ))}
</ul>
```

```tsx
// Good: Using index is perfectly fine for non-reorderable lists
// when no other unique ID is available in the data.
const steps = ['Step 1', 'Step 2', 'Step 3'];
return (
  <nav>
    {steps.map((label, index) => <span key={index}>{label}</span>)}
  </nav>
);
```

## Bad solution

Using an array index for a list that can be reordered or using non-stable identifiers.

```tsx
// Bad: Sorting will cause input values to stay in the wrong boxes
function TodoList({ items }) {
  return (
    <ul>
      {items.map((item, index) => (
        <li key={index}> {/* Bad for dynamic lists */}
          <input defaultValue={item.text} />
        </li>
      ))}
    </ul>
  );
}
```

## Impact

- **[Performance](../../home/impact/positive/performance.md)**: Stable keys allow React to reuse existing DOM nodes instead of destroying and recreating them.
- **[Robustness](../../home/impact/positive/robustness.md)**: Ensures that local component state (like text in an input) remains attached to the correct data item even as the list moves.
- **[Consistency](../../home/impact/positive/consistency.md)**: Prevents visual glitches and ensures transitions work as expected during list modifications.

## Exceptions

- **Static or Non-Reorderable Content**: If a list is truly static (items never move, are never deleted, and never inserted) and no unique identifier is available in the data, using the array `index` as a key is perfectly acceptable and will not cause performance or state issues.
