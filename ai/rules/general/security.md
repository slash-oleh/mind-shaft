---
description: "General: Security: Preventing vulnerabilities in code. Injections, auth, secrets, etc."
---

- **Don't misuse encoding**: Encoding (like Base64) is data representation. For protection, use encryption instead.
- **Mind frontend publicity**: Avoid storing secrets, API keys, or sensitive business logic on the client side.
- **Prevent SQL injection**: Use parameterized queries or an ORM to handle database interactions and avoid concatenating user input into SQL strings.
- **Prevent XSS**: Escape or sanitize user-controlled data before rendering and use safe DOM manipulation methods instead of direct HTML string injection.
- **Use secret management**: Use dedicated vault services, external files or environment variables to manage sensitive secrets and avoid storing them in source code.
- **Use secure CORS policy**: Restrict Cross-Origin Resource Sharing (CORS) to specific, trusted domains and avoid using wildcard origins (`*`) in production.
- **Use secure secrets**: Use cryptographically secure random number generators (CSPRNG) for secret values generation. Avoid using UUID or similar for that.
