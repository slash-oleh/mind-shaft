# Don't fail silently

Ensure that errors are always either handled explicitly or reported to the appropriate logging/monitoring system.

## Problem

Silently swallowing exceptions or ignoring error codes makes it impossible to diagnose production issues and can leave the application in an inconsistent or "zombie" state. When a failure is hushed, the system continues as if the operation succeeded, leading to corrupted data, misleading user feedback, and debugging nightmares where the root cause is completely hidden from logs.

## Good solution

Catch errors and report them, or allow them to propagate to a global error handler.

```ts
try {
  await sendEmail(email, message);
} catch (error) {
  logger.error('Failed to send email', { error, email });
}
```

## Bad solution

Empty catch blocks or returning without any indication that an error occurred.

```ts
try {
  await sendEmail(email, message);
} catch (error) {
  // Silent fail
}
```

## Why

- **[Reliability](../../home/quality-attributes/positive/reliability.md)**: Prevents hidden failures from corrupting state or misleading users.
- **[Maintainability](../../home/quality-attributes/positive/maintainability.md)**: Essential for effective debugging and monitoring in production.
- **[Explicitness](../../home/quality-attributes/positive/explicitness.md)**: Makes the system's behavior predictable even during failure scenarios.

## Exceptions

- **Intentional Ignore**: In very rare cases where a failure is truly inconsequential and expected, leave a comment explaining exactly why it is being ignored.

## References

- [Robert C. Martin: Clean Code - Error Handling](https://github.com/ryanmcdermott/clean-code-javascript#error-handling)
