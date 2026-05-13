# Environment variables

## TLDR

Always use environment variables only for minimal infrastructure configuration. Avoid using for business logic, feature flags or anything that can retrieved at runtime. Good: `settingsService.get('adminEmails')`. Bad: `process.env.ADMIN_EMAILS`.

## Problem

Misusing environment variables for business configuration creates a rigid system that requires technical intervention and full deployment cycles for minor adjustments. This approach prevents runtime updates, clutters the process environment, and often leads to security vulnerabilities by exposing settings in plain text across logging systems. It also forces technical staff to manage high-level application settings that should ideally be accessible to non-technical administrators via an interface.

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

## Impact

- **Flexibility**: Allows values to be updated on-the-fly without rebuilding, restarting, or redeploying the application.
- **Reliability**: Reduces the risk of "deployment fatigue" and human error during frequent minor configuration updates.
- **Security**: Limits the exposure of application secrets and sensitive paths to process-level environment dumps.

## Exceptions

- **Secrets in CI/CD**: When passing initial credentials to a secure secret vault during the bootstrap process.
- **Small, static projects**: For very small or static projects where a database-backed configuration system would be over-engineering.

## References

- [Adam Wiggins: The Twelve-Factor App - Config](https://12factor.net/config)
