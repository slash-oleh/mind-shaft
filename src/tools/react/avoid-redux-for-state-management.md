# Avoid Redux for state management

Do not use Redux as the default state management solution. Favor modern, specialized tools like React Query for server state and Zustand or Context for global UI state.

## Problem

Redux originates from an era before React Hooks and specialized data-fetching libraries. It imposes a massive "boilerplate tax" (actions, reducers, selectors, constants) that slows down development and inflates the codebase. Handling asynchronous logic with Thunks or Sagas is notoriously difficult to read, track, and test. Storing all application data in a single global "God object" also breaks component encapsulation and makes it harder to manage local state transitions efficiently.

## Good solution

Use specialized tools that solve specific state problems with minimal ceremony. Use **React Query** for server-side data (fetching, caching, synchronization) and **Zustand** (or React Context) for the small amount of truly global UI state (like themes or auth status).

```tsx
// Good: Using React Query for server state, minimal boilerplate
function UserProfile({ id }) {
  const { data: user, isLoading } = useQuery(['user', id], () => fetchUser(id));

  if (isLoading) return <Loading />;
  return <h1>{user.name}</h1>;
}

// Good: Using Zustand for simple global UI state
const useThemeStore = create((set) => ({
  isDark: false,
  toggle: () => set((state) => ({ isDark: !state.isDark })),
}));
```

## Bad solution

Implementing the full Redux cycle for every small feature or server-side data fetch.

```tsx
// Bad: Massive boilerplate for a simple data fetch
// actions.js, reducer.js, selectors.js, constants.js...
function UserProfile({ id, dispatch, user, loading }) {
  useEffect(() => {
    dispatch({ type: FETCH_USER_REQUEST, id });
  }, [id]);

  if (loading) return <Loading />;
  return <h1>{user.name}</h1>;
}
```

## Why

- **[KISS](../../home/quality-attributes/positive/kiss.md)**: Modern tools eliminate the "dispatch/selector" ceremony, allowing you to write significantly less code to achieve the same result.
- **[Maintainability](../../home/quality-attributes/positive/maintainability.md)**: React Query handles complex requirements like caching, background refetching, and window-focus synchronization automatically.
- **[Readability](../../home/quality-attributes/positive/readability.md)**: Async logic becomes much easier to follow when it's declarative rather than hidden in middleware like Thunks or Sagas.

## Exceptions

- **Legacy Maintenance**: Existing projects where Redux is already deeply integrated and the cost of migration outweighs the benefits.
- **Complex Offline-First Apps**: High-end applications that require extremely granular control over action ordering, persistence middleware, and complex side-effect pipelines that modern tools don't yet cover.

## References

- [Codexam: Is Redux Dead? Why I Kicked Redux Out of Our SaaS App](https://dev.to/codexam/is-redux-dead-why-i-kicked-redux-out-of-our-saas-app-5d1g)
- [GitConnected: You Might Not Need Redux](https://levelup.gitconnected.com/you-might-not-need-redux-883cd1fcbab0)
- [YouTube: Redux or Context in React](https://www.youtube.com/watch?v=5gUHfe-ETuo)
