# Logic portability

## TLDR

For logic, always prefer pure functions or services. Use hooks and providers only to bridge React state or lifecycle. Avoid wrapping simple logic in hooks or providers. Good: `formatDate(date)`. Bad: `useDateFormatter(date)`.

## Problem

"Hook-for-everything" mentality leads to logic bloat. Trivial tasks (formatting, validation, math) get wrapped in `useMemo` or custom hooks without reason. Logic becomes unnecessarily coupled to React lifecycle and non-portable. Testing requires component mounting. Codebase becomes harder to read due to hook-induced indentation and dependency arrays.

## Good solution

Keep logic in pure functions or services. Use hooks as thin proxy controllers. Hooks coordinate between React state and external logic.

```tsx
// utils.ts (Pure function)
export const formatCurrency = (amount: number) => `$${amount.toFixed(2)}`;

// AuthService.ts (Service)
export const AuthService = {
  login: (creds) => api.post('/login', creds),
};

// useAuth.ts (Thin proxy)
export const useAuth = () => {
  const [loading, setLoading] = useState(false);
  const login = async (creds) => {
    setLoading(true);
    try {
      return await AuthService.login(creds);
    } finally {
      setLoading(false);
    }
  };
  return { login, loading };
};

// Component.tsx
function Price({ val }) {
  const price = formatCurrency(val); // Simple function call, no hook
  return <span>{price}</span>;
}
```

## Bad solution

Wrapping every calculation or domain rule in hooks or providers.

```tsx
// Bad: Unnecessary hook for pure logic
const useCurrency = (val) => {
  return useMemo(() => `$${val.toFixed(2)}`, [val]);
};

// Bad: Business logic inside hook instead of service
const useAuth = () => {
  const login = async (creds) => {
    if (!creds.user) throw Error(); // Logic in hook
    return fetch('/api/login', { body: JSON.stringify(creds) });
  };
  return { login };
};
```

## Impact

- **[Decoupling](../../general/principles/separation-of-concerns.md)**: Logic works without React.
- **Portability**: Logic works in any environment (Node, Workers, other frameworks).
- **Simplicity**: Fewer hooks mean simpler components and fewer re-renders.
- **[Testability](../../general/principles/encapsulation.md)**: Pure functions and services tested via simple unit tests.

## Exceptions

- **React-specific state**: Logic inherently tied to `useState` or `useContext`.
- **Event listeners**: Hooks like `useWindowSize` that manage lifecycle events.
- **Third-party hooks**: Requirements from libraries (e.g. `useForm`, `useQuery`).
