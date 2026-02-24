# Resolve linter issues before committing to the mainline

Ensure all linter errors and warnings are resolved before merging code into the main branch to maintain high code quality and consistency.

## Problem

Linter warnings are often ignored or treated as "optional" suggestions, leading to a build-up of technical debt and inconsistent coding styles. When warnings accumulate, critical issues (like potential runtime errors or security flaws masked as warnings) become harder to spot. This "warning fatigue" eventualy results in a degraded codebase where the linter is no longer a trustworth tool.

## Good solution

Configure strict linter rules and treat them as mandatory. No code should be pushed with errors to any branch, and the main branch must remain entirely free of both errors and warnings. Resolve all issues as you write code, ideally using IDE integrations to catch problems in real-time.

```json
// Example: ESLint configuration with strict rules
{
  "rules": {
    "no-unused-vars": "error",
    "no-console": "warn",
    "eqeqeq": "error"
  }
}
```

## Bad solution

Ignoring linter output, pushing code with active warnings to the main branch, or disabling linter rules without a strong justification and a clarifying comment.

```js
// Bad: Ignoring a warning or using a broad disable
/* eslint-disable */
const data = eval(userInput);
```

## Why

- **[Consistency](../../home/quality-attributes/positive/consistency.md)**: Ensures the entire project follows a single, unified coding style, regardless of who writes the code.
- **[Reliability](../../home/quality-attributes/positive/reliability.md)**: Linters catch common mistakes and "code smells" before they can cause runtime issues.
- **[Readability](../../home/quality-attributes/positive/readability.md)**: Clean code, free of formatting noise and warnings, is significantly easier to review and understand.

## Exceptions

- When a linter rule produces a clear false-positive that cannot be avoided by refactoring or adjusting global config. In such cases, disable the rule for the specific line and add a comment explaining why.

## References

- [Wikipedia: Lint (software)](https://en.wikipedia.org/wiki/Lint_%28software%29)
