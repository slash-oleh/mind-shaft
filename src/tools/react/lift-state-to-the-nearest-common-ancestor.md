# Lift state to the nearest common ancestor

## TLDR

Position your state at the lowest possible level that still allows all components that need the data to access it.

## Problem

This "lifting state up" pattern ensures a single source of truth while avoiding unnecessary prop drilling.
When state is managed too deep in the component tree, it becomes impossible for sibling components or parent components to coordinate. For example, in a `Table`, if each `Row` manages its own `isExpanded` state, the parent `Table` cannot implement a "Collapse All" button or ensure that only one row is expanded at a time. This results in fragmented logic, where pieces of the same feature are scattered across different components, making the system difficult to control and prone to synchronization bugs. However, if you lift the state up to the `Page` component, you'll have to pass the state all the way down to the `Table` component, although nothing else except for the `Table` component will use it.

## Good solution

Identify the nearest common ancestor of all components that require the state and move the state there. This allows the parent to orchestrate the children as "controlled components." If the distance is too great, use **React Context** or a state management library (like **Zustand** or **Recoil**) to avoid excessive prop drilling.

```tsx
// Good: Table manages which row is expanded
export const Table = ({ items }) => {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  return (
    <div>
      <button onClick={() => setExpandedId(null)}>Collapse All</button>
      {items.map((item) => (
        <Row
          key={item.id}
          item={item}
          isExpanded={expandedId === item.id}
          onToggle={() => setExpandedId(expandedId === item.id ? null : item.id)}
        />
      ))}
    </div>
  );
};
```

## Bad solution

Encapsulating shared logic inside child components, preventing the parent from exercising control or coordinating between siblings.

```tsx
// Bad: Row manages its own state; Table has no control
export const Row = ({ item }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div onClick={() => setIsExpanded(!isExpanded)}>
      {item.name} {isExpanded && <Details />}
    </div>
  );
};
```

## Impact

- **[Cohesion](../../home/impact/positive/cohesion.md)**: Moves the coordination logic (e.g., "only one expanded") into the component responsible for the whole feature.
- **[Flexibility](../../home/impact/positive/flexibility.md)**: Allows the parent to easily add features like "Expand All," "Collapse All," or "Reset State" without modifying the children.

## Exceptions

- **Prop Drilling**: If lifting the state up requires passing props through many layers of intermediate components that don't use the data, consider using **React Context** or a dedicated state management library instead.
- **Truly Isolated State**: Logic that is strictly internal and has no effect on other components (e.g., whether a tooltip is currently hovering) can remain local.
