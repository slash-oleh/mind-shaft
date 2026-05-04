---
description: "General: Structure: Organizing code, files, modules. Architecture is too fancy word for it but close enough."
---

- **Domain modules**: Always place code within logical feature module. Avoid leaking components into unrelated scopes. Good: `user/Profile.tsx`. Bad: `dashboard/UserProfile.tsx`.
- **Feature-based grouping**: Always group top-level code by feature. Avoid root-level grouping by technical role like `api` or `models`. Good: `features/auth/services/login.ts`, `features/auth/models/user.ts`. Bad: `services/auth/login.ts`, `models/auth/user.ts`.
- **File size**: Always maintain balanced file size (50-400 lines). Avoid monolithic files or over-fragmentation. Good: `component.tsx` (200 LoC), `service.ts` (100 LoC), `types.ts` (50 LoC). Bad: `feature.tsx` (1000 LoC), `types.ts` (5 LoC).
- **Helper modules**: Always use corresponding domain modules for feature logic. Avoid stockpiling non-cohesive code into generic modules like `core` or `utils`. Good: `features/auth/service.ts`. Bad: `utils/auth.ts`.
- **Module entrypoints**: Always use public module entrypoints. Avoid reaching into internal file structure. Good: `import { AuthForm } from '@/features/auth'`. Bad: `import AuthForm from '@/features/auth/components/Form'`.
- **One component per file**: Always keep one primary component per file. Avoid multiple components in single file, unless as private one-time use helpers. Good: `SignIn.tsx`, `SignUp.tsx`. Bad: `forms.tsx` with both.
- **Source directory**: When not prescribled by external tool or not customizable, always put source files into dedicated sources directory. Avoid cluttering project root with application logic. Good: `src/auth/login.ts`, `scripts/deploy.sh`. Bad: `auth/login.ts`, `deploy.sh`.
- **Translation hierarchy**: Always organize translation keys to mirror module structure. Good: `user: { login: '...' }`. Bad: `forms: { login: '...' }`.
