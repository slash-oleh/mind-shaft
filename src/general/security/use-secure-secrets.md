# Secure randomness

## TLDR

For secrets, always use cryptographically secure random generators. Avoid UUIDs for security tokens. Good: `crypto.randomBytes(32)`. Bad: `uuid.v4()`.

## Problem

UUIDs are designed for uniqueness, not unpredictability. Many UUID versions (like Version 1) are generated using predictable inputs like timestamps and network MAC addresses. Other types, like Version 3 and Version 5, are deterministic hashes of a namespace and a name; if an attacker knows the namespace and can guess the name, they can easily recreate the "secret" UUID. Using UUIDs for security credentials makes the system vulnerable to brute-force attacks and predictable token generation.

## Good solution

Use a cryptographically secure random number generator provided by the platform (e.g., `crypto.randomBytes` in Node.js or `window.crypto.getRandomValues` in the browser) to generate high-entropy strings.

```typescript
// Good: Generating a secure random token in Node.js
import { randomBytes } from 'crypto';

const token = randomBytes(32).toString('hex'); // 64-character high-entropy string
```

## Bad solution

Using a UUID library to generate tokens or "secure" identifiers.

```typescript
// Bad: UUIDs are not designed for security
import { v4 as uuidv4 } from 'uuid';

const sessionToken = uuidv4(); // v4 is better than v1, but still not as secure as CSPRNG
```

## Impact

- **[Security](../../home/impact/positive/security.md)**: CSPRNGs provide the high level of entropy required to prevent token guessing and brute-force attacks.

## Exceptions

- When you only need an identifier to be unique within a system and it doesn't represent a secret or a security credential (e.g., a database primary key or a tracking ID).

## References

- [RFC 4122: A Universally Unique IDentifier (UUID) URN Namespace](https://tools.ietf.org/html/rfc4122)
- [OWASP: Generation of Randomness](https://cheatsheetseries.owasp.org/cheatsheets/Cryptographic_Storage_Cheat_Sheet.html#secure-random-number-generation)
