# Use a data request management library

## TLDR

Use specialized libraries like **TanStack Query (React Query)** or **SWR** to manage asynchronous data fetching. These tools automatically handle the lifecycle of a request - caching, synchronization, state management and many more.

## Problem

Managing server state manually using `useEffect` and `useState` is a recipe for complexity. It requires building custom logic for every request to handle loading states, error handling, caching, and data deduplication. Without a library, you are vulnerable to race conditions (where an older request completes after a newer one), and you miss out on critical modern features like background refetching, automatic retries on failure, and window-focus synchronization. This results in a fragmented, bug-prone architecture that delivers a subpar user experience.

## Good solution

Use a library like TanStack Query. It provides a declarative API that abstracts away the complexity of network requests and provides a robust cache that can be shared across the entire application.

```tsx
// Good: Declarative and robust data fetching
import { useQuery } from '@tanstack/react-query';

export const UserProfile = ({ userId }) => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['user', userId],
    queryFn: () => fetchUser(userId),
  });

  if (isLoading) return <Spinner />;
  if (isError) return <ErrorMessage />;

  return <div>{data.name}</div>;
};
```

## Bad solution

Manually wiring up `useEffect` for every data request, leading to redundant code and missing features.

```tsx
// Bad: Manual state management with race condition risks
export const UserProfile = ({ userId }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    setLoading(true);
    fetchUser(userId).then(data => {
      if (isMounted) {
        setUser(data);
        setLoading(false);
      }
    });
    return () => { isMounted = false; };
  }, [userId]);

  if (loading) return <Spinner />;
  return <div>{user?.name}</div>;
};
```

## Impact

- **[Performance](../../home/impact/positive/performance.md)**: Built-in caching avoids redundant network requests and makes the application feel significantly faster.
- **[Robustness](../../home/impact/positive/robustness.md)**: Automatically handles complex edge cases like request deduplication, retries, and stale-while-revalidate logic.

## Exceptions

- **Direct Socket Connections**: If you are using a purely real-time push mechanism (like WebSockets) where request/response caching isn't applicable.
- **Trivial One-offs**: Extremely rare cases where you need a single request in an isolated script and adding a dependency is strictly prohibited.

## References

- [TanStack: Query (React Query) Documentation](https://tanstack.com/query/latest)
- [Vercel: SWR - React Hooks for Data Fetching](https://swr.vercel.app/)
