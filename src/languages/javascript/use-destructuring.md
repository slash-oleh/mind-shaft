# Destructuring

## TLDR

Always extract properties in assignments and function parameters. Avoid repeated property access via parent object. Avoid destructuring directly in function signature, unless it's a small anonymous callback. Good: `f = (user) => { const { name, avatarUrl } = user; ... }`, `users.find(({ id }) => id === profileId)`. Bad: `f(user.name, user.avatarUrl)`, `users.find((user) => user.id === profileId)`, `const f = ({ name, avatarUrl, ... }) => { ... }`.

## Problem

Repeatedly referencing properties through their parent objects creates visual noise and obscures the core logic. This "property drilling" makes it harder to identify at a glance which specific data points a block of code depends on, and increases the difficulty of refactoring as object name changes must be propagated across multiple redundant references.

## Good solution

Use destructuring to extract only the needed properties into local variables or directly in function parameters.

```javascript
// GOOD: Destructuring assignment
const { email, password } = user;
await signIn(email, password);

// GOOD: Destructuring in function parameters
const printProfile = (profile) => {
  const { name, avatarUrl } = profile;
  console.log(`User: ${name}`);
  console.log(`Avatar: ${avatarUrl}`);
};
```

## Bad solution

Repeatedly referencing the object or accessing properties via manual variable assignment.

```javascript
// BAD: Redundant repetition of 'user'
await signIn(user.email, user.password);

// BAD: Manual property referencing in function body
const printProfile = (user) => {
  console.log(`User: ${user.name}`);
  console.log(`Avatar: ${user.avatarUrl}`);
};
```

## Impact

- **[Context Deduplication](../../home/impact/positive/context-deduplication.md)**: Removes redundant repetitions of the source object name.
- **[Readability](../../home/impact/positive/readability.md)**: Clearly states which properties are used at the top of the scope or in the signature.
- **[Maintainability](../../home/impact/positive/maintainability.md)**: Makes refactoring easier as you only need to change the property name in one place (the destructuring assignment).

## Exceptions

- **Single property usage**: If you only need one property once, `const name = user.name` or using `user.name` directly might be cleaner than a full destructuring block.
- **Namespace conflicts**: When multiple objects have properties with the same name and renaming them via `{ name: userName }` would reduce clarity rather than improve it.
- **Highly dynamic keys**: When keys are computed or vary based on logic.

## References

- [MDN: Destructuring assignment](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment)
- [Clean Code: Use Object Destructuring](https://github.com/ryanmcdermott/clean-code-javascript#use-object-destructuring)
