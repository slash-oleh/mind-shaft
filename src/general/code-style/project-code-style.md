# Project code style

## TLDR

Always match existing codebase style. Avoid mixing styles or combining cleanup with functional changes, unless ongoing project-wide migration. Good: `f(opts); g(opts);`. Bad: `f(opts); f({ opts })`.

## Problem

Introducing a different coding style into an existing project even if the new style follows "better" practices creates inconsistency. This makes the codebase harder to read (as developers must constantly switch mental models), complicates version control history (diffs become cluttered with stylistic changes), and can lead to "broken window" syndrome where the lack of a unified style encourages further degradation.

Moreover, mixing stylistic "cleanup" with functional changes makes code reviews significantly harder, as reviewers must distinguish between logical bug fixes and purely aesthetic modifications.

## Good solution

Adapt your code to match the surrounding style. If a widespread style change is needed, apply it rule-by-rule across the whole project as a separate, dedicated task.

```typescript
// Existing files use single-line arrays for small lists
const fruits = ['apple', 'orange'];

// GOOD: Match the existing style in new code
const colors = ['red', 'blue'];
```

## Bad solution

Mixing styles within the same project or combining style changes with feature development.

```typescript
// Existing code
const fruits = ['apple', 'orange'];

// BAD: Introducing a different style for a similar construct
const colors = ['red', 'blue'];
```

## Impact

- **[Consistency](../../home/impact/positive/consistency.md)**: A uniform codebase is easier to navigate and maintain.
- **[Readability](../../home/impact/positive/readability.md)**: predictable patterns reduce cognitive load.
- **[Maintainability](../../home/impact/positive/maintainability.md)**: Separating style from logic makes the version history much cleaner and easier to audit.

## Exceptions

- **Greenfield projects**: Where a new style is being established for the first time.
- **Complete migration**: When the project is intentionally moving to a new standard and the transition is being managed systematically.

## References

- [Wikipedia: Consistency – The Most Important Code Style Rule](https://en.wikipedia.org/wiki/Programming_style#Consistency)
- [Conventional Commits: Separation of Concerns (in Commits)](https://www.conventionalcommits.org/)
