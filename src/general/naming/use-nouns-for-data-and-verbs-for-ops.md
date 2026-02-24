# Use nouns for data and verbs for ops

## TLDR

Distinguish between data variables and executable operations by using nouns for data and verbs for functions/methods to clearly communicate their structural role in the code.

## Problem

Using verbs for data variables (e.g., `const fetchUser = { ... }`) or nouns for operations (e.g., `const user = (id) => { ... }`) is confusing. It hides the nature of the identifier and leads to misuse (e.g., trying to call a data object or treating a function as a static value). This role-confusion makes the code harder to follow and increases the likelihood of runtime errors.

## Good solution

Strictly use nouns for variables holding data and verbs (starting with an action) for functions and methods.

```typescript
// Good: Clear distinction between data and operations
const user = await fetchUser(userId); // Noun for data, Verb for operation
const itemsCount = 10;                // Noun for data

const validateInput = (input) => { ... }; // Verb for operation
```

## Bad solution

Using nouns for operations or verbs for data placeholders.

```typescript
// Bad: Role confusion
const fetchUser = { id: 42 };         // Verb for a static object
const user = (id) => { ... };         // Noun for an operation
const checkStatus = true;             // Verb for a boolean constant
```

## Impact

- **[Readability](../../home/impact/positive/readability.md)**: Allows developers to immediately identify whether an identifier is a value or an action.
- **[Consistency](../../home/impact/positive/consistency.md)**: Establishes a logical grammatical structure for the entire codebase.

## Exceptions

- None.

## References

- [Naming Cheatsheet: Parts of Speech](https://github.com/kettanaito/naming-cheatsheet)
