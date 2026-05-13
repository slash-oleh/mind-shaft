# Component remounting

## TLDR

Always define component functions at top level or use raw function call to render. Avoid defining inside render cycle along with JSX or `createElement` rendering. Good: `RenderHeader = () => {}; return <>{RenderHeader()}</>`. Bad: `RenderHeader = () => {}; return <><RenderHeader/>{createElement(RenderHeader)}</>`.

## Problem

React uses the reference of a component function to determine whether it should update or remount. When you define a component inside another, the inner component function is recreated on every render of the parent. React sees this as a completely new component type and performs a full "unmount and remount" of the entire sub-tree. This has several catastrophic side effects:

- **State Loss**: All local state within the sub-tree is reset on every parent render.
- **Focus Loss**: Input items lose focus because the DOM nodes are destroyed and recreated.
- **Performance**: High CPU usage and flicker as the browser re-evaluates and paints the entire UI segment.
- **Broken Transitions**: CSS animations and transitions fail to work because the elements don't persist.

## Good solution

Define components at the top level (outside of any other component). If you need to break down a large component into smaller pieces but don't want to create separate files yet, use "render functions" (helpers that return JSX) and call them as plain functions.

```tsx
// Good: Component is defined once at the top level
const ListItem = ({ id, label }) => <li key={id}>{label}</li>;

function MyList({ items }) {
  // Use a helper function if needed, but call it as a function {renderHeader()}
  const renderHeader = () => <h2>Items List</h2>;

  return (
    <ul>
      {renderHeader()}
      {items.map((item) => (
        <ListItem {...item} />
      ))}
    </ul>
  );
}
```

## Bad solution

Defining a component inside the render cycle or using `useCallback` to generate a component "type."

```tsx
// Bad: InnerComponent is recreated on every render of Parent
function Parent() {
  const [count, setCount] = useState(0);

  // CRITICAL BUG: This is a "new" component type on every render
  const InnerComponent = () => <div>Inner count: {count}</div>;

  return (
    <div>
      <button onClick={() => setCount((c) => c + 1)}>Increment</button>
      {/* This will unmount/remount on every click! */}
      <InnerComponent />
      {/* This is equivalent to the above */}
      {createElement(InnerComponent)}
    </div>
  );
}
```

## Impact

- **Performance**: Prevents the massive overhead of destroying and rebuilding the DOM on every state change.
- **Robustness**: Preserves local component state, DOM focus, and scroll position.

## Exceptions

- None. If you need closure variables, pass them as props to a top-level component.
