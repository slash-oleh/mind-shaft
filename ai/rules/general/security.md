---
description: "General: Security: Preventing vulnerabilities in code. Injections, auth, secrets, etc."
---

- **CORS policy**: In production, always restrict CORS to trusted domains. Avoid wildcard origins. Good: `origin: ['a.com']`. Bad: `origin: '*'`.
- **Dependency upgrades**: For system security and stability, always keep dependencies updated to latest stable versions. Avoid long-lived legacy versions with known vulnerabilities but also bleeding edge ones. Good: automated Renovate/Dependabot pull requests. Bad: ignoring "outdated" warnings for months.
- **Encoding**: For data protection, always use encryption. Avoid misusing encoding as obfuscation for confidentiality. Good: `send(aes.encrypt(secret))`. Bad: `send(b64encode(secret))`.
- **Frontend publicity**: Always keep secrets and sensitive logic on server. Avoid storing external API keys or private config in client storage or using in the frontend code. Good: `fetch('/api/email-service')`. Bad: `localStorage.setItem('SMTP_PASSWORD', process.env.SMTP_PASSWORD)`.
- **Least privilege**: For resource access, always grant minimum permissions required for task. Never use admin or root accounts for routine operations. Good: read-only service account for analytics. Bad: global admin role for every developer.
- **Random predictability**: For secrets, always use cryptographically secure random generators. Avoid UUIDs for security tokens. Good: `crypto.randomBytes(32)`. Bad: `uuid.v4()`.
- **Secrets management**: Always load secrets from environment variables or vault services. Avoid hardcoding secrets in source code. Good: `vault.get('key')`, `process.env.KEY`. Bad: `const KEY = 'abc'`.
- **SQL injection**: Always use parameterized queries or ORM. Avoid concatenating user input into SQL strings. Good: `WHERE id = ?`, `.where('id', id)`. Bad: `WHERE id = ${id}`.
- **XSS**: Always escape user data before rendering. Use safe DOM methods. Avoid `innerHTML` with untrusted input. Good: `el.textContent = val`. Bad: `el.innerHTML = val`.
- **Zero trust**: For network and system access, always verify every request regardless of origin. Never trust users or services based on network location alone. Good: identity-based micro-segmentation. Bad: trusting all internal LAN traffic.
