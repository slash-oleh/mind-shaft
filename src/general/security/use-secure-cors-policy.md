# Use secure CORS policy

Always restrict Cross-Origin Resource Sharing (CORS) to specific, trusted domains in production environments. Avoid using wildcard origins (`*`) which effectively disable browser-level cross-origin protections.

## Problem

CORS is a security mechanism that allows a server to indicate any origins (domain, scheme, or port) other than its own from which a browser should permit loading resources. Setting `Access-Control-Allow-Origin: *` or blindly echoing the `Origin` header disables these protections. This allows any malicious website to make cross-origin requests to your API, potentially leading to unauthorized data access or session-based attacks if credentials are included.

## Good solution

Explicitly list allowed origins in your server configuration. Use environment variables to manage different allow-lists for local development (which may be more permissive) and production.

```typescript
// Good: Restricting origins to trusted domains (Express example)
const allowedOrigins = ['https://app.example.com', 'https://admin.example.com'];

app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  }
}));
```

## Bad solution

Using the wildcard `*` in production or a policy that returns `true` for any incoming origin.

```typescript
// Bad: Disabling cross-origin protection
app.use(cors({
  origin: '*'
}));
```

## Why

- **[Security](../../home/quality-attributes/positive/security.md)**: Prevents unauthorized third-party websites from making authenticated requests to your API.
- **[Reliability](../../home/quality-attributes/positive/reliability.md)**: Standardizes communication channels and prevents unexpected side-effects from unvetted origins.

## Exceptions

- Public APIs specifically designed for anonymous, worldwide use where data is not sensitive (e.g., a public font service or an anonymous ticker API).
- Local development environments where convenience outweighs the risk (e.g., `localhost`).

## References

- [OWASP: Content Security Policy Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Content_Security_Policy_Cheat_Sheet.html)
- [MDN Web Docs: Cross-Origin Resource Sharing (CORS)](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS)
