---
description: "General: Security"
---

# General: Security

## Don't confuse encoding with encryption
Use encryption for data protection and avoid relying on encoding (like Base64) as a security measure.
[read more](https://github.com/insolite/dev-rules/blob/main/src/general/security/don-t-confuse-encoding-with-encryption.md)

## Don't use UUID as a secure random string
Use cryptographically secure random number generators (CSPRNG) instead of UUIDs for security credentials, session tokens, or unpredictable strings.
[read more](https://github.com/insolite/dev-rules/blob/main/src/general/security/don-t-use-uuid-as-a-secure-random-string.md)

## Frontend code is public
Assume all frontend source code is public and avoid storing secrets, API keys, or sensitive business logic on the client side.
[read more](https://github.com/insolite/dev-rules/blob/main/src/general/security/frontend-code-is-public.md)

## Prevent Cross-Site Scripting (XSS)
Escape or sanitize user-controlled data before rendering and prefer safe DOM manipulation methods over direct HTML string injection.
[read more](https://github.com/insolite/dev-rules/blob/main/src/general/security/prevent-cross-site-scripting-xss.md)

## Prevent SQL injection
Use parameterized queries or an ORM to handle database interactions and avoid concatenating user input into SQL strings.
[read more](https://github.com/insolite/dev-rules/blob/main/src/general/security/prevent-sql-injection.md)

## Use secret management
Use environment variables or dedicated vault services to manage sensitive secrets and avoid storing them in source code.
[read more](https://github.com/insolite/dev-rules/blob/main/src/general/security/use-secret-management.md)

## Use secure CORS policy
Restrict Cross-Origin Resource Sharing (CORS) to specific, trusted domains and avoid using wildcard origins (`*`) in production.
[read more](https://github.com/insolite/dev-rules/blob/main/src/general/security/use-secure-cors-policy.md)
