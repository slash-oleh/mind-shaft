# Avoid global variables for application state

Avoid using plain variables in the module scope to store data that affects the UI. Use **local component state** for isolated data or **React Context** (or a state management library) for shared data.

## Problem

Plain global variables exist outside of React's reactive system and its component lifecycle. Using them leads to several critical issues:

- **Lack of Reactivity**: React only re-renders when state or props change. If you update a global variable, the UI stays "dead" and won't reflect the new data.
- **Cross-talk**: Global variables are shared across all instances of a component. Updating data for one instance will unexpectedly change it for all others.
- **Data Leakage (SSR)**: In Server-Side Rendering environments, global variables are shared across all user requests. This can leak private user data from one session into another.
- **Test Fragility**: State persists between unit tests, making them non-deterministic and difficult to debug.

## Good solution

Store your data within React's management system. Use `useState` for logic restricted to a single component and `Context` for data that must be shared across multiple components.

```tsx
// Good: Local state for isolated logic
function Counter() {
  const [count, setCount] = useState(0);
  return <button onClick={() => setCount(c => c + 1)}>{count}</button>;
}

// Good: Context for shared application state
const UserContext = createContext(null);
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  return (
    <UserContext.Provider value={user}>
      {children}
    </UserContext.Provider>
  );
};
```

## Bad solution

Using variables declared outside the component function (module scope) to track user interaction or shared data.

```tsx
// Bad: React doesn't track this variable, and it's shared globally
let globalCount = 0;

export const Counter = () => {
  const handleIncrement = () => {
    globalCount += 1; // UI will not update!
  };
  return <button onClick={handleIncrement}>{globalCount}</button>;
};
```

## Impact

- **[Robustness](../../home/impact/positive/robustness.md)**: Essential for stable Server-Side Rendering and reliable unit testing.

## Exceptions

- **Static Constants**: Configuration objects, translation keys, or theme definitions that are truly static and never change during the application's lifecycle.
- **Ref escape hatches**: Use `useRef` for values that must persist between renders but **should not** trigger a re-render when changed (e.g., a timer ID).
