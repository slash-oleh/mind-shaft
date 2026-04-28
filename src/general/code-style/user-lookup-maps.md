# Use lookup maps

## TLDR

Use objects or Maps for multi-branch logic instead of if/else or switch.

## Problem

Using long `if/else if` chains or `switch` statements for simple key-based dispatching is verbose and imperatively styled. As the number of cases grows, the code becomes harder to read and maintain. Each new case adds cognitive load and increases the risk of missing a branch or mismanaging the "default" case. This approach also couples the dispatching logic with the implementation of each branch, making it difficult to scale or refactor.

## Good solution

Define a lookup object (or `Map`) where keys are the conditions and values are the corresponding results or handler functions.

```javascript
const handleStatus = (status) => {
  const statusHandlers = {
    SUCCESS: () => console.log('Operation successful'),
    FAIL: () => console.log('Operation failed'),
    PENDING: () => console.log('Operation in progress'),
  };

  const handler =
    statusHandlers[status] || (() => console.log('Unknown status'));
  handler();
};
```

## Bad solution

Using an imperative branching structure for simple key-to-action mapping.

```javascript
const handleStatus = (status) => {
  if (status === 'SUCCESS') {
    console.log('Operation successful');
  } else if (status === 'FAIL') {
    console.log('Operation failed');
  } else if (status === 'PENDING') {
    console.log('Operation in progress');
  } else {
    console.log('Unknown status');
  }
};
```

## Impact

- **[Scalability](../../home/impact/positive/scalability.md)**: Adding a new case is as simple as adding a new key-value pair to the map.
- **[Declarative](../../home/impact/positive/declarative.md)**: Describes _what_ to do for each key rather than _how_ to branch to it.
- **[Readability](../../home/impact/positive/readability.md)**: The relationship between keys and actions is immediately obvious.
- **[Maintainability](../../home/impact/positive/maintainability.md)**: Encourages smaller, focused functions and separates selection logic from execution logic.

## Exceptions

- **Complex conditions**: When branches depend on complex ranges, multiple variables, or dynamic logical expressions that cannot be easily mapped to keys.
- **Performance-extreme paths**: In rare cases where object lookup overhead is a measurable bottleneck (though modern JS engines optimize this extremely well).
- **Fallthrough logic**: When you intentionally need the "fallthrough" behavior of a `switch` statement (though this is often considered a code smell itself).

## References

- [Refactoring Guru: Replace Conditional with Polymorphism](https://refactoring.guru/replace-conditional-with-polymorphism)
- [Martin Fowler: Replace Conditional with Polymorphism (Refactoring)](https://refactoring.com/catalog/replaceConditionalWithPolymorphism.html)
