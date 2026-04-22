---
description: "General: Security"
---

- Use encryption for data protection and avoid relying on encoding (like Base64) as a security measure.
- Use cryptographically secure random number generators (CSPRNG) instead of UUIDs for security credentials, session tokens, or unpredictable strings.
- Assume all frontend source code is public and avoid storing secrets, API keys, or sensitive business logic on the client side.
- Escape or sanitize user-controlled data before rendering and prefer safe DOM manipulation methods over direct HTML string injection.
- Use parameterized queries or an ORM to handle database interactions and avoid concatenating user input into SQL strings.
- Use environment variables or dedicated vault services to manage sensitive secrets and avoid storing them in source code.
- Restrict Cross-Origin Resource Sharing (CORS) to specific, trusted domains and avoid using wildcard origins (`*`) in production.
