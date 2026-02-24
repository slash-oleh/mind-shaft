# Use secret management

Never store credentials, API keys, or any sensitive secrets directly in the source code. Use environment variables, configuration storage, or dedicated vault services to manage sensitive information securely.

## Problem

Hardcoding secrets in source code is a major security risk. Even if the code is private, it exposes secrets to anyone with repository access. Furthermore, version control systems (VCS) like Git preserve the entire history of a file; once a secret is committed, it remains in the history even if it's subsequently removed from the latest version. Discovering these secrets is trivial for attackers using automated scanning tools.

## Good solution

Load sensitive configuration at runtime from external sources.

**Best Practices:**

- **Environment Variables**: Use `.env` files (locally) and CI/CD secrets (in production) to inject credentials into the application process.
- **Dedicated Vaults**: For high-security environments, use services like AWS Secrets Manager, HashiCorp Vault, or Google Secret Manager.
- **`.gitignore`**: Always ensure that files containing local secrets (like `.env`) are excluded from version control.

```typescript
// Good: Loading credentials from environment variables
initService({ token: process.env.SERVICE_TOKEN });

// Good: Fetching from a secret manager (pseudo-code)
const secret = await vault.getSecret('SERVICE_TOKEN');
initService({ token: secret });
```

## Bad solution

Hardcoding literal secret values or keys directly in the codebase, even for "temporary" testing.

```typescript
// Bad: Secret exposed in source code and history
initService({ token: 'kj42f9ughksng9ugh4j2fnjfnnf31' });
```

## Impact

- **[Security](../../home/impact/positive/security.md)**: Prevents accidental exposure of sensitive credentials and reduces the blast radius of a potential code leak.
- **[Maintainability](../../home/impact/positive/maintainability.md)**: Allows rotation of secrets (changing passwords/keys) without modifying and redeploying the application code.

## Exceptions

- Non-sensitive public identifiers or configuration values that pose no security risk (e.g., a public analytics ID).

## References

- [OWASP: Secrets Management Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Secrets_Management_Cheat_Sheet.html)
- [git-secrets: Tool to prevent committing secrets](https://github.com/awslabs/git-secrets)
