# Module entrypoints

## TLDR

Always use public module entrypoints. Avoid reaching into internal file structure. Good: `import { AuthForm } from '@/features/auth'`. Bad: `import AuthForm from '@/features/auth/components/Form'`.

## Problem

Directly importing from a submodule's internal structure (e.g., `import { HiddenComponent } from '@/features/auth/components/internal/HiddenComponent'`) bypasses the intentional boundaries set by the module's author. This creates hard dependencies on implementation details that are likely to change, leading to fragile code that breaks frequently during refactoring. It also makes the module's surface area difficult to manage and audit.

## Good solution

Import from the submodule's main entry point (usually `index.ts`), which explicitly defines its public API.

```typescript
// Good: Importing from the submodule's public entry point
import { SignInForm } from '@/features/auth';
import { useUser } from '@/features/user';
```

## Bad solution

Reaching deep into a submodule's directory structure to access internal files.

```typescript
// Bad: Importing internal implementation details directly
import { SignInForm } from '@/features/auth/components/forms/SignInForm';
import { useUser } from '@/features/user/hooks/useUser';
```

## Impact

- **Encapsulation**: Protects a module's internal logic and state from unauthorized external access.
- **Maintainability**: Allows the internal structure of a module to be refactored without breaking its consumers.
- **Cohesion**: Ensures that a module presents a unified and intentional interface to the rest of the application.

## Exceptions

- Within the submodule itself, where internal files must necessarily import from each other.
- When explicitly configuring or overriding low-level module behavior (very rare and should be well-documented).
