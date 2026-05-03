# Source directory

## TLDR

When not prescribled by external tool or not customizable, always put source files into dedicated sources directory. Avoid cluttering project root with application logic. Good: `src/auth/login.ts`, `scripts/deploy.sh`. Bad: `auth/login.ts`, `deploy.sh`.

## Problem

Placing application logic or feature folders directly in the project root (e.g., `auth/`, `user/`) clutters the top-level directory. This makes it difficult to distinguish between core application code and project configuration files (like `.gitignore`, `package.json`, or `.eslintrc`). It also complicates build scripts, testing configurations, and linting rules, which often need to target application code separately from configuration files.

## Good solution

Collect all source files into a single `src` directory. Only non-code, project-level configuration files (usually dotfiles or standard manifest files) should remain in the root.

```text
// Good: Clean root folder
project-root/
  .eslintrc.json
  package.json
  tsconfig.json
  src/
    user/
      getUser.ts
    auth/
      login.ts
```

## Bad solution

Mixing application code with configuration files at the project root level.

```text
// Bad: Cluttered root folder
project-root/
  .eslintrc.json
  package.json
  auth/           // Application code in root
    login.ts
  user/           // Application code in root
    getUser.ts
```

## Impact

- **[Consistency](../../home/impact/positive/consistency.md)**: Follows standard industry practices for project organization, making it easier for new developers to onboard.
- **[Readability](../../home/impact/positive/readability.md)**: Provides a clear separation between "how the project is configured" and "what the project actually does".
- **[Maintainability](../../home/impact/positive/maintainability.md)**: Simplifies tooling (Build, Lint, Test) by providing a single, predictable target directory for application code.

## Exceptions

- Configuration files, project metadata, and scripts that _must_ reside in the project root as required by standard tooling (e.g., `Dockerfile`, `docker-compose.yml`, `README.md`).
