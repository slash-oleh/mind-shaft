# Don't confuse encoding with encryption

Understand the fundamental difference between encoding (data representation) and encryption (data protection). Never use encoding as a security measure to protect sensitive information.

## Problem

Developers sometimes mistakenly treat encoding (like Base64) or basic obfuscation as a form of security. Encoding is a reversible process that transforms data into a different format for compatibility or storage; it does not require a secret key and can be easily decoded by anyone who knows the algorithm. Relying on encoding for security creates a false sense of protection, as the underlying data remains fully accessible to attackers.

## Good solution

Use industry-standard encryption algorithms (like AES or RSA) with strong, securely managed random keys (secrets) when you need to protect data confidentiality.

```typescript
// Good: Using real encryption with a secret key
import { createCipheriv, randomBytes } from 'crypto';

const algorithm = 'aes-256-gcm';
const key = Buffer.from(process.env.ENCRYPTION_KEY, 'hex');
const iv = randomBytes(16);

const cipher = createCipheriv(algorithm, key, iv);
const encrypted = cipher.update(sensitiveData, 'utf8', 'hex') + cipher.final('hex');
```

## Bad solution

Using encoding like Base64 or custom "obfuscation" to store passwords, tokens, or personal identifiers.

```typescript
// Bad: Base64 is NOT encryption
const encodedHeader = Buffer.from(sensitiveData).toString('base64');
// Anyone can run: Buffer.from(encodedHeader, 'base64').toString()
```

## Impact

- **[Security](../../home/impact/positive/security.md)**: Only encryption prevents unauthorized access by requiring a secret key.
- **[Reliability](../../home/impact/positive/reliability.md)**: Proper cryptographic practices are resistant to analysis and brute-force attacks.

## Exceptions

- When data is non-sensitive and only needs to be transformed for transport or storage (e.g., URL encoding or binary-to-text conversion).

## References

- [OWASP: Cryptographic Storage Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Cryptographic_Storage_Cheat_Sheet.html)
- [Stack Overflow: Base64 is not encryption](https://stackoverflow.com/questions/3534571/is-base64-encoding-safe)
