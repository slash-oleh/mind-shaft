# Separate the business-logic part and the user interface

## TLDR

Decouple business logic and state management from the presentation layer. Use "headless" patterns or service layers to ensure that logic remains independent of specific UI components.

## Problem

Tightly coupling business logic with the user interface (e.g., a single component containing API calls, complex state transitions, and JSX/HTML) leads to monolithic, untestable code. It makes the UI difficult to restyle or swap (e.g., moving from a modal to a separate page) and prevents logic reuse across different presentation formats (e.g., Web vs. Mobile).

Furthermore, when feature modules grow without internal organization, they become "junk drawers" of mixed files, making it hard to find the specific technical role (actions, forms, components) each file serves.

## Good solution

Organize code by separating concerns. Keep business logic, data fetching, and state management in pure TypeScript/JavaScript files or "headless" hooks, and use UI components only for rendering. Within a feature module, use sub-directories to categorize files by their technical role if there are multiple instances.

```text
// Good: Clear separation of logic and UI, organized by technical role
src/
  features/
    user/
      actions/
        signIn.ts        -- Pure logic/API call
        signUp.ts
      forms/
        SignInForm.tsx   -- UI form
        SignUpForm.tsx
      hooks/
        useAuth.ts       -- Headless state management
      services/
        userService.ts   -- Data layer
```

## Bad solution

Mixing logic and presentation in the same file, or keeping a flat structure that mixes different technical roles.

```typescript
// Bad: Tightly coupled logic and UI
// UserPage.tsx
export const UserPage = () => {
  const [data, setData] = useState(null);
  useEffect(() => {
    fetch('/api/user').then(r => r.json()).then(setData);
  }, []);

  if (!data) return <Loading />;
  return <div>{data.name}</div>; // Hard to test logic without UI
};
```

```text
// Bad: Disorganized feature module
user/
  signInAction.ts
  signUpAction.ts
  SignInForm.tsx
  SignUpForm.tsx
```

## Impact

- **[Coupling](../../home/impact/negative/coupling.md)**: Logic and UI can evolve independently.
- **[Testability](../../home/impact/positive/testability.md)**: Business logic can be unit-tested without a browser or DOM simulation.
- **[Reusability](../../home/impact/positive/reusability.md)**: Headless logic can be reused across different UI components or platforms.
- **[Readability](../../home/impact/positive/readability.md)**: Technical role separation makes it easy to locate specific types of code.

## Exceptions

- Extremely simple components that only handle minor UI state (e.g., a toggle button).
- Small prototypes where quick iteration is prioritized over architectural purity.

## References

- [GitHub: Node.js Best Practices - Structure your solution by components](https://github.com/goldbergyoni/nodebestpractices/blob/master/sections/projectstructre/breakintcomponents.md)
- [HackerNoon: Structuring projects and naming components in React](https://hackernoon.com/structuring-projects-and-naming-components-in-react-1261b6e18d76)
