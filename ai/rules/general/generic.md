---
description: "General: Generic: Everything that applies to multiple existing categories or doesn't belong to any."
---

- **Clean architecture**: Always separate business logic from infrastructure. Avoid mixing HTTP/DB logic in core. Good: `loginService(token)`. Bad: `loginHandler(request)`.
- **Composition vs inheritance**: Always use composition to build complex functionality. Avoid deep class hierarchies, tight parent-child coupling, multiple inheritance, mixins. Good: `UserHandler(logger, auth); userHandler.logger.log()`. Bad: `UserHandler extends BaseHandler; userHandler.log()`.
- **Dependency patches**: Always contribute 3rd-party dependency fixes to original repositories. Avoid maintaining local patches or private forks. Good: Submit PR upstream. Bad: Monkey-patching locally.
- **DevOps**: Always automate build, test, and deployment. Avoid manual SSH/FTP steps. Good: `./deploy.sh` in CI. Bad: `scp -R . root@...` locally.
- **Environment variables**: Always use environment variables only for minimal infrastructure configuration. Avoid using for business logic, feature flags or anything that can retrieved at runtime. Good: `settingsService.get('adminEmails')`. Bad: `process.env.ADMIN_EMAILS`.
- **File size**: Always maintain balanced file size (50-400 lines). Avoid monolithic files or over-fragmentation. Good: `component.tsx` (200 LoC), `service.ts` (100 LoC), `types.ts` (50 LoC). Bad: `feature.tsx` (1000 LoC), `types.ts` (5 LoC).
- **Maintained dependencies**: Always use tools with active maintenance and healthy ecosystems. Avoid unmaintained or archived libraries. Good: `npm i lodash`. Bad: `npm i react-popper`.
- **Premature optimization**: Always prioritize readability over performance until measured. Avoid "clever" tricks or micro-optimizations. Good: `filter().map()`. Bad: `reduce()`.
- **Semantic versioning**: Always use SemVer (MAJOR.MINOR.PATCH) for versioning. Avoid arbitrary version numbers or inventing custom counting methods. Good: `v1.0.1`. Bad: `v-2025-5C`.
- **Spell checking**: For documentation, comments and user-facing texts, always use automated text and grammar checkers. Avoid manual proofreading reliance and ignoring typos. Good: `Weclome to homepage`. Bad: `Welcome to homepage`.
- **Translations**: Always internalize user-facing strings into translation files. Avoid hardcoded string literals in business logic or UI. Good: `alert(t('auth.loginError'))`. Bad: `alert('Authorization failed')`.
- **Up-to-date docs**: Always maintain README as accurate project entry point. Avoid letting docs rot while project evolves. Good: Up-to-date setup steps. Bad: Tribal knowledge reliance.
- **YAGNI**: Always keep solutions proportional to current requirements. Avoid premature abstractions or complex "future-proof" patterns unless "future" is defined. Good: `f(id)`. Bad: `f({ id })`.
