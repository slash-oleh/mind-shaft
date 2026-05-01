# Avoid Container/Presentational pattern

## TLDR

Use Hooks to keep logic and UI cohesive within a single component instead of splitting them into "Container" and "Presentational" pairs by default.

## Problem

The Container/Presentational pattern (also known as the "Smart/Dumb" pattern) creates significant boilerplate and complicates the component hierarchy. By artificially splitting a single feature into two components, you increase the amount of prop-drilling and make it harder to trace how data flows from the source to the screen. This pattern organizes code by _technical role_ rather than _feature responsibility_, leading to a fragmented developer experience where you have to jump between multiple files to understand a single piece of functionality.

## Good solution

Keep logic and UI together. Use custom hooks to encapsulate and share complex logic while keeping the component itself focused on its primary responsibility.

```tsx
// Good: Logic and UI are cohesive in one component
function UserProfile({ userId }) {
  const { user, isLoading, error } = useUser(userId); // Custom hook for logic

  if (isLoading) return <Spinner />;
  if (error) return <ErrorMessage message={error.message} />;

  return (
    <article>
      <h1>{user.name}</h1>
      <p>{user.bio}</p>
    </article>
  );
}
```

## Bad solution

Always splitting a feature into a "wrapper" component for data and a "view" component for the UI.

```tsx
// Bad: Redundant split leading to prop-drilling and extra files
// UserProfileContainer.tsx
function UserProfileContainer({ userId }) {
  const [user, setUser] = useState(null);
  useEffect(() => {
    /* fetch user */
  }, [userId]);

  return <UserProfileView user={user} />;
}

// UserProfileView.tsx
function UserProfileView({ user }) {
  return (
    <article>
      <h1>{user.name}</h1>
      <p>{user.bio}</p>
    </article>
  );
}
```

## Impact

- **[Cohesion](../../home/impact/positive/cohesion.md)**: Keeps related data-fetching and display logic in one place, making the feature easier to understand and debug.
- **[KISS](../../home/impact/positive/kiss.md)**: Reduces the total number of components and files in the project.
- **[Maintainability](../../home/impact/positive/maintainability.md)**: Hooks are a more flexible abstraction for logic reuse than component wrapping.

## Exceptions

- **Truly Reusable UI Primitives**: When building a low-level UI library (e.g., a complex DataGrid) that must remain entirely "dumb" to be used across many different data sources.
- **Extreme Complexity**: If a component's render logic is so massive (thousands of lines) that separating the view helps purely with file scannability (though refactoring into smaller sub-components is usually better).
