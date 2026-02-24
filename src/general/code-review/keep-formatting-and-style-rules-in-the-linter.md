# Keep formatting and style rules in the linter

## TLDR

Automate code formatting and style enforcement using linters and formatters like ESLint or Prettier.

## Problem

Manual code formatting enforcement is inefficient and prone to human error. It leads to:

- **Noise in Reviews**: Code reviews become cluttered with minor style corrections, distracting from logic and architectural feedback.
- **Inconsistency**: Different developers may have different preferences, leading to a "visual mess" in the codebase if not strictly automated.
- **Developer Friction**: Constant manual feedback on formatting can be frustrating and hinder productivity.

## Good solution

Configure automated tools to handle formatting and style. Use shared configurations (like `eslint-config-airbnb` or custom project rules) and ensure they are enforced via pre-commit hooks or CI/CD pipelines.

```json
// Good: Shared project-wide ESLint configuration
{
  "extends": ["eslint:recommended", "plugin:react/recommended", "prettier"],
  "rules": {
    "semi": ["error", "always"],
    "quotes": ["error", "single"]
  }
}
```

## Bad solution

Relying on developers to "remember" the style guide or arguing about formatting in Pull Requests.

```text
// Bad: Reviewer comment on a PR
Reviewer: "Please use single quotes here instead of double quotes."
// This should have been caught and auto-fixed by the linter.
```

## Impact

- **[Consistency](../../home/impact/positive/consistency.md)**: Ensures the entire codebase looks like it was written by a single person.
- **[Maintainability](../../home/impact/positive/maintainability.md)**: Prevents the gradual accumulation of style-related technical debt.

## Exceptions

- **Complex Domain DSLs**: Some highly specialized or generated code might require custom formatting that standard linters can't handle perfectly. In such cases, use ignore files sparingly.

## References

- [GitHub: Node.js Best Practices - Use ESLint](https://github.com/goldbergyoni/nodebestpractices?tab=readme-ov-file#-16-use-eslint)
- [Prettier: Why Prettier?](https://prettier.io/docs/next/why-prettier)
