---
description: "General: Ecosystem: Everything that's part of product or delivery but isn't just code. Environment, dependencies, infrastructure, etc."
---

- **Dependency patches**: Always contribute 3rd-party dependency fixes to original repositories. Avoid maintaining local patches or private forks. Good: Submit PR upstream. Bad: Monkey-patching locally.
- **Environment variables**: Always use environment variables only for minimal infrastructure configuration. Avoid using for business logic, feature flags or anything that can retrieved at runtime. Good: `settingsService.get('adminEmails')`. Bad: `process.env.ADMIN_EMAILS`.
- **Maintained dependencies**: Always use tools with active maintenance and healthy ecosystems. Avoid unmaintained or archived libraries. Good: `npm i lodash`. Bad: `npm i react-popper`.
- **Semantic versioning**: Always use SemVer (MAJOR.MINOR.PATCH) for versioning. Avoid arbitrary version numbers or inventing custom counting methods. Good: `v1.0.1`. Bad: `v-2025-5C`.
- **Spell checking**: For documentation, comments and user-facing texts, always use automated text and grammar checkers. Avoid manual proofreading reliance and ignoring typos. Good: `Weclome to homepage`. Bad: `Welcome to homepage`.
- **Translations**: Always internalize user-facing strings into translation files. Avoid hardcoded string literals in business logic or UI. Good: `alert(t('auth.loginError'))`. Bad: `alert('Authorization failed')`.
- **Up-to-date docs**: Always maintain README as accurate project entry point. Avoid letting docs rot while project evolves. Good: Up-to-date setup steps. Bad: Tribal knowledge reliance.
