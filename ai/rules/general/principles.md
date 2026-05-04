---
description: "General: Principles"
---

- **Clean architecture**: Always separate business logic from infrastructure. Avoid mixing HTTP/DB logic in core. Good: `loginService(token)`. Bad: `loginHandler(request)`.
- **Composition over inheritance**: Always use composition to build complex functionality. Avoid deep class hierarchies, tight parent-child coupling, multiple inheritance, mixins. Good: `UserHandler(logger, auth); userHandler.logger.log()`. Bad: `UserHandler extends BaseHandler; userHandler.log()`.
- **DevOps**: Always automate build, test, and deployment. Avoid manual SSH/FTP steps. Good: `./deploy.sh` in CI. Bad: `scp -R . root@...` locally.
- **DRY**: When repeating what's expected to be changed together, extract and reuse. Avoid duplication, unless code represents the same visual shape, and not underlying concept (premature deduplication). Good: `limit = 5; limit1 = limit; limit2 = limit;`, `default1 = []; default2 = [];`. Bad: `limit1 = 5; limit2 = 5;`, `default = []; default1 = empty; default2 = empty;`.
- **Encapsulation**: Always keep implementation private and export only public API. Avoid exposing internal logic for potential direct usage. Good: `export { Form, FormProps } from 'form.tsx'`. Bad: `export { Form, FieldWrapper, FormBackground } from 'form.tsx'`.
- **Premature optimization**: Always prioritize readability over performance until measured. Avoid "clever" tricks or micro-optimizations. Good: `filter().map()`. Bad: `reduce()`.
- **Separation of concerns**: Always decouple domain, business logic, presentation (UI), infrastructure from each other. Use headless hooks or services. Good: `useAuth()`, `signIn.ts`. Bad: `UserPage.tsx` with `useEffect(fetch)`.
- **YAGNI**: Always keep solutions proportional to current requirements. Avoid premature abstractions or complex "future-proof" patterns unless "future" is defined. Good: `f(id)`. Bad: `f({ id })`.
