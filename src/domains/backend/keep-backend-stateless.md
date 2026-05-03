# Stateless runtime

## TLDR

Always rely on external shared persistence. Avoid in-memory state and local storage. Good: `await redis.get(session)`. Bad: `const sessions = {}`.

## Problem

Storing state (like user sessions, temporary calculations, or cached data) in the application's memory or on a local disk makes the service "sticky." Requests from the same user must be routed to the same physical instance, which complicates load balancing and makes it impossible to scale horizontally by simply adding more instances. Furthermore, if an instance crashes or is restarted (which is common in cloud environments), all local state is lost, leading to interrupted user sessions, data loss, or inconsistent application behavior.

## Good solution

Delegate all state management to external, shared persistence layers like databases (PostgreSQL, MongoDB) or distributed caches (Redis). Each request should contain all the information necessary to process it, often authenticated via stateless tokens like JWT.

```typescript
// GOOD: Fetching state from a shared, external source (Redis)
const getUserSession = async (sessionId: string) => {
  const session = await redis.get(`session:${sessionId}`);
  return session ? JSON.parse(session) : null;
};

// GOOD: Processing request based on input and shared persistence
export const handleRequest = async (req, res) => {
  const session = await getUserSession(req.headers['x-session-id']);
  if (!session) return res.status(401).send();

  // Logic remains pure and instance-independent
  const data = await db.users.find(session.userId);
  res.json(data);
};
```

## Bad solution

Using global variables or local in-memory objects to track cross-request or cross-session state.

```typescript
// BAD: In-memory store is local to THIS instance only
const activeSessions = new Map();

export const handleRequest = async (req, res) => {
  const sessionId = req.headers['x-session-id'];
  const session = activeSessions.get(sessionId); // Will fail if request hits a different instance

  if (!session) {
    // ... logic to login and set session
    activeSessions.set(sessionId, { userId: '123' });
  }

  res.json({ userId: session.userId });
};
```

## Impact

- **[Scalability](../../home/impact/positive/scalability.md)**: Allows the application to scale horizontally (adding more instances) effortlessly as any instance can handle any request.
- **[Reliability](../../home/impact/positive/reliability.md)**: Instances become "disposable." If one fails, the load balancer can immediately route traffic to others without losing user state.
- **[Portability](../../home/impact/positive/portability.md)**: Simplifies deployment in containerized environments (Docker, Kubernetes, Serverless) where instances are short-lived and frequently moved.
- **[Consistency](../../home/impact/positive/consistency.md)**: Ensures all users see the same data regardless of which server instance they happen to reach.

## Exceptions

- **Short-lived request-scoped state**: It's perfectly fine to use local variables _within the scope of a single request_ processing.
- **Local Read-only Cache**: Caching static configuration data that is identical across all instances and doesn't change based on user interaction (though a distributed cache is still often better).
- **Standalone legacy systems**: When specifically designing a singular, non-distributed tool where horizontal scale is explicitly not a requirement.

## References

- [Twelve-Factor App: Stateless Processes](https://12factor.net/processes)
- [Red Hat: Stateless vs Stateful Architecture](https://www.redhat.com/en/topics/cloud-native-apps/stateful-vs-stateless)
