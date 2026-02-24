# Use consistent casing

## TLDR

Use camelCase consistently for all variable and function names, and ensure that acronyms and abbreviations follow regular casing rules (e.g., `userId` instead of `userID`).

## Problem

Inconsistent casing (e.g., mixing `camelCase`, `snake_case`, and `lowercase`) makes the codebase look unorganized and harder to scan. Merged words like `firstname` or `userslist` are harder to read and parse than their properly cased counterparts (`firstName`, `usersList`).

A specialized problem occurs with **all-caps acronyms** (e.g., `userID`, `parseHTMLURL`). They disrupt the natural flow of casing and create **boundary ambiguity**. If you have a variable named `MyHTMLURLIsConfusing`, it's impossible to tell at a glance if the next word starts at `URLI` or `UrlI`, or if `HTML` and `URL` are one concept or two.

## Good solution

Strictly adhere to the project's casing standard (usually `camelCase` for JS/TS) for all identifiers. Treat acronyms and abbreviations as regular words, capitalizing only the first letter when it begins a new word boundary.

```typescript
// Good: Clear word boundaries and regularized acronyms
const firstName = 'John';
const userProfile = { ... };
const fetchUrl = 'https://api.example.com';
const userId = 42;

// Good: Boundary ambiguity resolved
const myHtmlUrlIsClear = '...'; // Word boundaries are distinct
```

## Bad solution

Using inconsistent casing, merged words, or all-caps acronyms that obscure word boundaries.

```typescript
// Bad: Inconsistent and merged words
const first_name = 'John';
const userprofile = { ... };

// Bad: Boundary ambiguity with all-caps acronyms
const userID = 42;
const fetchLatestURL = '...';
const myHTMLURLIsConfusing = '...'; // Is it HTML + URL or HTMLUR + L?
```

## Impact

- **[Readability](../../home/impact/positive/readability.md)**: Consistent casing and regularized acronyms allow developers to quickly parse word boundaries and identify the nature of an identifier.
- **[Consistency](../../home/impact/positive/consistency.md)**: Ensures the codebase follows a single, professional aesthetic and avoids ambiguity in acronym-rich names.

## Exceptions

- React components (usually `PascalCase`).
- Environmental variables or constants that use `SCREAMING_SNAKE_CASE`.
- External API keys or properties that mandate a specific casing.

## References

- [Google: JavaScript Style Guide - Naming](https://google.github.io/styleguide/jsguide.html#naming)
- [W3Schools: JavaScript Naming Conventions](https://www.w3schools.com/js/js_conventions.asp)
