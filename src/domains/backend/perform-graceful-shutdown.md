# Graceful shutdown

## TLDR

Always handle termination signals to finish pending tasks and close connections. Avoid abrupt process exits and hang-ups. Good: `process.on('SIGTERM', cleanup)`. Bad: `process.exit(1)` during active request.

## Problem

When a backend process is terminated abruptly (e.g., during a deployment or scaling event), it immediately stops execution regardless of its current state. If the application is in the middle of processing a long-running request, writing to a database, or handling a multi-step transaction, sudden termination leads to:

- **Data Corruption**: Half-written records or inconsistent state across different services.
- **Broken User Experience**: Clients receive "Connection Refused" or "500 Internal Server Error" instead of a clean response.
- **Resource Leaks**: Database connections, file handles, or active socket connections might not be closed properly, potentially leading to exhaustion on the infrastructure side.
- **Incomplete Background Tasks**: Jobs that were "in flight" are lost without a trace, often requiring manual recovery.

## Good solution

Register listeners for termination signals (`SIGTERM`, `SIGINT`) and execute a teardown sequence. This sequence should stop accepting new connections, wait for active requests to complete (with a timeout), and then close all persistent resources like database pools and message queue connections.

```typescript
// GOOD: Handling process signals to shutdown cleanly
const gracefulShutdown = async (signal: string) => {
  console.log(`${signal} received. Starting graceful shutdown...`);

  // 1. Stop accepting new requests (e.g., if using Express/Fastify)
  server.close(async () => {
    console.log('HTTP server closed.');

    // 2. Close database connections
    await db.disconnect();
    console.log('Database disconnected.');

    // 3. Close other external resources (Redis, MQ, etc.)
    await redis.quit();

    process.exit(0);
  });

  // Force shutdown after timeout if things get stuck
  setTimeout(() => {
    console.error('Shutdown timed out, forcing exit.');
    process.exit(1);
  }, 10000);
};

process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
process.on('SIGINT', () => gracefulShutdown('SIGINT'));
```

## Bad solution

Ignoring OS signals and letting the container manager or orchestrator (like Kubernetes) force-kill the process after it fails to exit.

```typescript
// BAD: No signal handling. The process is killed immediately
// upon SIGTERM from the orchestrator, leaving everything in flight.
const start = async () => {
  await db.connect();
  app.listen(3000);
};

start();
// (Process has no process.on('SIGTERM') handlers)
```

## Impact

- **[Reliability](../../home/impact/positive/reliability.md)**: Prevents data loss and ensures the system remains in a predictable state during transitions.
- **[Consistency](../../home/impact/positive/consistency.md)**: Guarantees that business processes reach an atomic conclusion or a safe rollback point.
- **[Robustness](../../home/impact/positive/robustness.md)**: Makes the application a "good citizen" in containerized environments where restarts are frequent.

## Exceptions

- **Ephemeral Scripts**: Short-lived CLI tools or migration scripts that perform a single task and exit immediately might not require complex signal handling.
- **Purely Stateless Utilities**: Small utilities that do not interact with databases or external state _might_ get away with sudden termination, though it's still not recommended.

## References

- [Node.js: Signal Events](https://nodejs.org/api/process.html#process_signal_events)
- [Kubernetes: Termination of Pods](https://kubernetes.io/docs/concepts/workloads/pods/pod-lifecycle/#pod-termination)
- [The Twelve-Factor App: Disposability](https://12factor.net/disposability)
