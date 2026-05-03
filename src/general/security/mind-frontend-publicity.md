# Frontend publicity

## TLDR

Always keep secrets and sensitive logic on server. Avoid storing external API keys or private config in client storage or using in the frontend code. Good: `fetch('/api/email-service')`. Bad: `localStorage.setItem('SMTP_PASSWORD', process.env.SMTP_PASSWORD)`.

## Problem

Developers sometimes mistakenly believe that obfuscation, minification, or "secure" client-side storage (like localStorage or encrypted cookies) makes data inaccessible to users. However, if the client is responsible for decrypting or using a secret, the key and the process are inherently visible to the user. Storing sensitive data on the frontend allows attackers to extract credentials, bypass security checks, and abuse internal APIs.

## Good solution

Keep all sensitive operations and secrets on the server side. The frontend should only receive the data it needs to display to the current authenticated user.

**Best Practices:**

- **Server-Side Secret Storage**: Use environment variables and secret managers on the backend.
- **Proxy Sensitive APIs**: If a third-party API requires a private key, call it from your backend and return only the necessary results to the frontend.
- **Backend Authentication**: Perform all authorization and permission checks on the server, never relying on a "is_admin" flag in the frontend code.

```typescript
// Good: Backend handles the sensitive API call
// Frontend just calls your own secured endpoint
const data = await fetch('/api/data-from-sensitive-service');
```

## Bad solution

Storing API keys or private configuration in the frontend, even if "protected" by encoding or custom logic.

```typescript
// Bad: Secrets are still visible in network tabs or source maps
const SENSITIVE_API_KEY = 'my-secret-key';
const decodedKey = atob(ENCODED_KEY); // Obfuscation is not security
```

## Impact

- **[Integrity](../../home/impact/positive/integrity.md)**: Prevents users from manipulating the system's security boundaries.
- **[Reliability](../../home/impact/positive/reliability.md)**: Ensures the system remains secure regardless of client-side inspection or tampering.

## Exceptions

- Public API keys intended for client-side use (e.g., Google Maps public key, Stripe publishable key).

## References

- [OWASP: Client-Side Security](https://cheatsheetseries.owasp.org/cheatsheets/Microservices_Security_Cheat_Sheet.html#client-side-security)
