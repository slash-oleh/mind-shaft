# Don't overuse environment variables

Reserve environment variables for infrastructure configuration and bootstrap values that the application requires to start. Avoid using them for business logic parameters, feature flags, or settings that change frequently, as this forces unnecessary deployment cycles and creates operational bottlenecks.

## Problem

Misusing environment variables for business configuration creates a rigid system that requires technical intervention for minor setting adjustments. Every value change necessitates a restart or a full CI/CD deployment cycle, which is an overkill for high-level application settings like notification emails or discount rates. From a security perspective, environment variables are often stored in plain text across various logging and monitoring systems, making them poor candidates for highly sensitive data if better alternatives like secret managers are available. Furthermore, shifting these responsibilities to technical staff prevents non-technical administrators from managing the application via a user interface.

## Good solution

Store application-level settings in a database or a specialized configuration service that allows for runtime updates.

```typescript
// Good: Fetching dynamic configuration from the database
const settings = await settingsService.getGeneralSettings();
const adminEmails = settings.adminEmails;
```

## Bad solution

Cluttering the process environment with business-level configuration.

```typescript
// Bad: Forcing a redeploy just to change an email list
const adminEmails = process.env.ADMIN_EMAILS?.split(',');
```

## Why

- **[Flexibility](../../home/quality-attributes/positive/flexibility.md)**: Allows values to be updated on-the-fly without rebuilding, restarting, or redeploying the application.
- **[Reliability](../../home/quality-attributes/positive/reliability.md)**: Reduces the risk of "deployment fatigue" and human error during frequent minor configuration updates.
- **[Security](../../home/quality-attributes/positive/security.md)**: Limits the exposure of application secrets and sensitive paths to process-level environment dumps.

## Exceptions

- **Secrets in CI/CD**: When passing initial credentials to a secure secret vault during the bootstrap process.
- **Small, static projects**: For very small or static projects where a database-backed configuration system would be over-engineering.

## References

- [Adam Wiggins: The Twelve-Factor App - Config](https://12factor.net/config)
