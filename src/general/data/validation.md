# Validation

## TLDR

For system safety, integrity and consistency, always validate data at boundaries and before persistence. Avoid trusting external inputs or assuming DTO version compatibility. Good: `UserSchema.parse(data);`. Bad: `data as UserSchema;`.

## Problem

Untrusted input causes application crashes or security vulnerabilities (e.g. injection). Inconsistent data states lead to logic failures across decoupled services. Version mismatches in DTOs break consumers during rolling deployments or cache TTL overlaps. Lack of validation masks corruption until data persisted, making recovery expensive.

## Good solution

Implement strict validation at boundaries (User input, API, Database). Use runtime schema validation to guarantee type safety. Verify structural integrity, domain constraints, and version compatibility.

```typescript
import { z } from 'zod';

const UserResponseSchema = z.object({
  id: z.string().uuid(),
  email: z.string().email(),
  // Explicit version check for DTO compatibility
  schemaVersion: z.literal(2),
});

const handleApiResponse = (data: unknown) => {
  // GOOD: Validation at boundary
  const user = UserResponseSchema.parse(data);
  return user;
};
```

## Bad solution

Trusting external inputs or assuming structural correctness via type casting.

```typescript
const handleApiResponse = (data: any) => {
  // BAD: Type casting hides missing fields or version mismatches
  const user = data as UserDto;

  // App crashes if email is missing or format invalid
  console.log(user.email.toLowerCase());
  return user;
};
```

## Impact

- **[Security](../../home/impact/positive/security.md)**: Prevents injection and malicious payload exploitation.
- **[Reliability](../../home/impact/positive/reliability.md)**: Guarantees internal logic operates on consistent and valid state.
- **[Maintainability](../../home/impact/positive/maintainability.md)**: Precise error reporting for boundary failures eases debugging.

## Exceptions

- **Internal trusted micro-services**: When sharing same code/types in monorepo and using strict transport (though runtime validation still recommended for defense-in-depth).
- **Performance hot-paths**: High-frequency telemetry where full schema parsing overhead is unacceptable (use sampling or light checks).

## References

- [OWASP: Input Validation Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Input_Validation_Cheat_Sheet.html)
- [Zod: Documentation](https://zod.dev/)
