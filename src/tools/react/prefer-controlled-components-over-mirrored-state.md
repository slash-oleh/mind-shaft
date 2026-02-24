# Prefer controlled components over mirrored state

## TLDR

Use controlled components where the parent remains the single source of truth instead of mirroring props in local state.

## Problem

Mirroring a prop in local state and attempting to keep them in sync using `useEffect` creates multiple sources of truth. This anti-pattern frequently leads to "stale-sync" bugs where the UI and the actual data drift apart. It also forces React to perform redundant render cycles - first to update the local state and then again when the parent reacts to the change. This approach makes components fragile, harder to debug, and unnecessarily complex.

## Good solution

Keep the component "pure" and controlled. Use the props directly for rendering and invoke a callback (like `onChange`) to notify the parent of a change. The parent component manages the data, ensuring absolute consistency across the UI.

```tsx
// Good: Fully controlled component
const Input = ({ value, onChange }) => {
  return (
    <input
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  );
};
```

## Bad solution

Initializing local state from a prop and then using a side effect to sync that state back to the parent.

```tsx
// Bad: Mirroring props in state and syncing via useEffect
const Input = (props) => {
  const [value, setValue] = useState(props.value);

  // Redundant and error-prone synchronization
  useEffect(() => {
    props.onChange(value);
  }, [value]);

  return (
    <input
      value={value}
      onChange={(e) => setValue(e.target.value)}
    />
  );
};
```

## Impact

- **[Consistency](../../home/impact/positive/consistency.md)**: Guarantees that the component always reflects the most up-to-date value from its parent.
- **[KISS](../../home/impact/positive/kiss.md)**: Eliminates the maintenance burden of tracking duplicate values and manual synchronization logic.
- **[Performance](../../home/impact/positive/performance.md)**: Reduces the number of re-renders by eliminating the intermediate "state sync" step.

## Exceptions

- **Initial Values Only**: If a prop is explicitly intended as a *starting point* (e.g., `defaultValue`) and the parent does not need to remain synchronized with changes, using local state is appropriate.
- **Performance-Critical Inputs**: In rare cases with high-frequency updates (like a complex text editor), "uncontrolled" components with `refs` might be used to bypass React's render cycle for localized performance gains.
