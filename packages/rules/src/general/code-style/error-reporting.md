# Error reporting

## TLDR

Always handle errors explicitly and report to logging or monitoring. Avoid failing silently such as in empty catch blocks, unless failure truly inconsequential. Good: `catch { log }`. Bad: `catch {}`.

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

## Impact

- **Reliability**: Prevents hidden failures from corrupting state or misleading users.
- **Maintainability**: Essential for effective debugging and monitoring in production.
- **Explicitness**: Makes the system's behavior predictable even during failure scenarios.

## Exceptions

- **Intentional Ignore**: In very rare cases where a failure is truly inconsequential and expected, leave a comment explaining exactly why it is being ignored.

## References

- [Robert C. Martin: Clean Code - Error Handling](https://github.com/ryanmcdermott/clean-code-javascript#error-handling)
