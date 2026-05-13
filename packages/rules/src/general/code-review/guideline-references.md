# Guideline references

## TLDR

In comments, always reference project guidelines and documentation via links. Avoid repetitive explanations. Good: `"See class naming conventions in docs"`. Bad: `<lengthy manual explanation>`.

## Problem

Manually explaining the same best practices or style rules in every Pull Request is inefficient and leads to:

- **Redundant Effort**: Reviewers waste time typing out the same advice repeatedly.
- **Inconsistency**: Different reviewers might explain the same rule slightly differently, leading to confusion.
- **Review Bloat**: Long explanations of standard rules can bury more critical, case-specific feedback.
- **Scaling Issues**: as a team grows, it becomes harder to ensure everyone is on the same page without a centralized "source of truth."

Instead, direct developers to a centralized knowledge base, reinforcing project standards.

## Good solution

Use short comments with links to the shared project guidelines or specific documentation articles.

```text
// Good: Clear reference to the guidelines
Reviewer: "Please use nouns for data and verbs for operations here. See the project naming conventions in the documentation."
```

## Bad solution

Writing out lengthy explanations for common violations or just saying "fix this" without providing context or a reference.

```text
// Bad: Redundant and time-consuming explanation
Reviewer: "In this project, we prefer to use full names for variables instead of abbreviations because it makes the code more readable and helps other developers understand the context without having to guess what 'usr' stands for..."
```

## Impact

- **Consistency**: Ensures everyone is following the same "documented" version of the rules.

## Exceptions

- **Complex Nuance**: If the specific application of a rule is particularly subtle or requires a unique explanation in the current situation, provide the extra detail alongside the reference.

## References

- [GitHub: Contributing to a project](https://docs.github.com/en/get-started/exploring-projects-on-github/contributing-to-a-project)
