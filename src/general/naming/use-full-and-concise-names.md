# Use concise words

## TLDR

Use common, complete, descriptive words instead of cryptic abbreviations, contractions while avoiding excessive verbosity that doesn't add clarity.

## Problem

Identifiers fall into two common traps regarding length:

1. **Cryptic Abbreviations**: Names like `u`, `usr`, `src`, or `tbl` are ambiguous and save a few characters at the cost of high cognitive load and ambiguity.
2. **Over-verboseness**: Names like `externallyFetchedUserWithDetailedProfileInfo` are difficult to read and leads to visual clutter and line wrapping without adding essential information.

## Good solution

Use full words for clarity, but keep them as short as possible. Trust the surrounding context (classes, modules) to provide additional detail.

```typescript
// Good: Full, clear, yet concise names
const user = await fetchUser();
const source = getSource();
const profile = await getUserProfile(userId);

// Good: Concise in context
const activeAccount = accounts.find((a) => a.isActive);
```

## Bad solution

Using short, non-standard abbreviations or wordy descriptions that repeat information.

```typescript
// Bad: Cryptic abbreviations
const u = await fetchUsr();
const src = getSrc();

// Bad: Overly verbose and redundant
const externallyFetchedUserWithDetailedInfo = await fetchUser();
const currentActiveAccountFoundInTheList = accounts.find((a) => a.isActive);
```

## Impact

- **[Readability](../../home/impact/positive/readability.md)**: Full names make the code self-documenting, while conciseness ensures it remains scannable and less visually overwhelming.
- **[Maintainability](../../home/impact/positive/maintainability.md)**: Reduces the risk of collisions between abbreviations and simplifies future modifications by keeping names focused.

## Exceptions

- **Industry Standards**: Extremely common abbreviations (e.g., `ID`, `URL`, `HTML`).
- **Loop Counters**: Short-lived variables in very small scopes (e.g., `i`, `j` in loops).
- **Absolute Precision**: Rare domain terms that are naturally long but required for clarity.

## References

- [Clean Code: Meaningful Names](https://www.oreilly.com/library/view/clean-code-a/9780136083238/)
- [Naming Cheatsheet: Context](https://github.com/kettanaito/naming-cheatsheet)
