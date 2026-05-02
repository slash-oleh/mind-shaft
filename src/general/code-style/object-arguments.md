# Object arguments

## TLDR

For multiple function arguments, when existing interface covers them, pass entire object. Avoid extracting individual properties as separate arguments, unless function must remain decoupled or dependency overhead is too high. Good: `f(u)`. Bad: `f(u.id, u.name)`.

## Problem

Breaking an object into multiple parameters leads to rigid signatures that are difficult to evolve. When a function's requirements change, you are forced to update the signature and every call site, which increases the likelihood of maintenance bottlenecks and human error. Accepting individual properties also detaches the function from its domain context, making the code more verbose and harder to refactor than a system that operates on stable, object-based interfaces.

## Good solution

Accept the domain object directly to maintain a stable and flexible signature.

```ts
interface User {
  id: number;
  name: string;
}

const printUser = (user: User) => {
  const { id, name } = user;
  console.log(`${id}: ${name}`);
};

const deleteUser = (id: number) => {
  userRepository.delete(id);
};
```

## Bad solution

Extracting multiple properties into separate arguments, making the function signature fragile.

```ts
interface User {
  id: number;
  name: string;
}

const printUser = (id: number, name: string) => {
  console.log(`${id}: ${name}`);
};

const deleteUser = (user: User) => {
  userRepository.delete(user.id);
};
```

## Impact

- **[Maintainability](../../home/impact/positive/maintainability.md)**: Adding a new required property from the same object doesn't break the function signature.
- **[Reusability](../../home/impact/positive/reusability.md)**: Functions accepting domain types are easier to compose and share across modules.
- **[Robustness](../../home/impact/positive/robustness.md)**: Reduces the risk of argument-order errors, especially when multiple parameters share the same type.
- **[Single Source of Truth](../../home/impact/positive/consistency.md)**: Logic remains coupled to the data structure it operates on.

## Exceptions

- **Decoupling**: When a function should remain generic and independent of a specific domain object. For example, a `validateEmail` utility should accept a string rather than a `User` object to remain usable in contexts where a `User` entity doesn't exist.
- **Single Property Usage**: If a function truly only needs a single property and has no logical reason to be aware of the rest of the object's context.

## References

- [Refactoring Guru: Preserve Whole Object](https://refactoring.guru/preserve-whole-object)
- [Martin Fowler: Introduce Parameter Object (Refactoring)](https://refactoring.com/catalog/introduceParameterObject.html)
- [Robert C. Martin: Clean Code - Function Arguments](https://github.com/ryanmcdermott/clean-code-javascript#function-arguments-2-or-fewer-ideally)
