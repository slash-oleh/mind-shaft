---
description: "General: Principles: Well-known generic principles, design patterns, philosophies, best-practices."
---

- **Clean architecture**: Always separate business logic from infrastructure. Avoid mixing HTTP/DB logic in core. Good: `loginService(token)`. Bad: `loginHandler(request)`.
- **Composition over inheritance**: Always use composition to build complex functionality. Avoid deep class hierarchies, tight parent-child coupling, multiple inheritance, mixins. Good: `UserHandler(logger, auth); userHandler.logger.log()`. Bad: `UserHandler extends BaseHandler; userHandler.log()`.
- **DevOps**: Always automate build, test, and deployment. Avoid manual SSH/FTP steps. Good: `./deploy.sh` in CI. Bad: `scp -R . root@...` locally.
- **DRY**: When repeating the logic that's expected to be changed together, extract and reuse. Avoid duplication, unless code represents the same visual shape, and not underlying concept (premature deduplication). Good: `f = (x) => x * 2; a = f(x); b = f(y);`. Bad: `a = x * 2; b = y * 2;`.
- **Encapsulation**: Always keep implementation private and export only public API. Avoid exposing internal logic for potential direct usage. Good: `export { Form, FormProps } from 'form.tsx'`. Bad: `export { Form, FieldWrapper, FormBackground } from 'form.tsx'`.
- **Exception handling**: Always catch exceptions only where adding context, recovery, or translation to domain errors. Avoid redundant manual logging, duplicating a global fallback logging. Good: `try { f() } catch (e) { throw Error(`User creation failed: ${e.message}`, { cause: e }) }`. Bad: `try { f() } catch (e) { console.log('User creation failed', e); }`.
- **Fail-fast**: Always validate assumptions and inputs early. Avoid continuing execution with invalid state or "silent" errors. Good: `if (!id) throw Error();`. Bad: `if (!id) return;`.
- **Premature optimization**: Always prioritize readability over performance until measured. Avoid "clever" tricks or micro-optimizations. Good: `filter().map()`. Bad: `reduce()`.
- **Separation of concerns**: Always decouple domain, business logic, presentation (UI), infrastructure from each other. Use headless hooks or services. Good: `useAuth()`, `signIn.ts`. Bad: `UserPage.tsx` with `useEffect(fetch)`.
- **Single source of truth**: For information, always define facts exactly once. Avoid mirroring configurations, duplicating knowledge, rules, or split ownership. Good: `total = items.reduce(...)`. Bad: `setTotal(items.reduce(...))`.
- **YAGNI**: Always keep solutions proportional to current requirements. Avoid premature abstractions or complex "future-proof" patterns unless "future" is defined. Good: `f(id)`. Bad: `f({ id })`.
