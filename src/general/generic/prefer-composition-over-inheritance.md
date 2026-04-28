# Prefer composition over inheritance

## TLDR

Use composition to build complex functionality by combining simple, independent components instead of creating deep class hierarchies.

## Problem

Inheritance creates a tight coupling between the base class and its subclasses (often referred to as the "fragile base class" problem). Changes in the parent class can have unintended side effects across the entire hierarchy. Deep inheritance trees also make the code hard to follow, difficult to test, and inflexible when requirements change, as a class is forced to inherit all behaviors of its parent, even if some are irrelevant or harmful.

## Good solution

Use composition to assemble behavior from smaller, reusable parts. This allows for greater flexibility, as components can be swapped or combined in different ways at runtime without affecting other parts of the system.

```ts
// Good: Composition using independent components
class Logger {
  log(message: string) {
    console.log(message);
  }
}

class Authenticator {
  authenticate(user: string) {
    /* ... */
  }
}

class UserHandler {
  constructor(
    private logger: Logger,
    private auth: Authenticator,
  ) {}

  handle(user: string) {
    this.auth.authenticate(user);
    this.logger.log(`Handled user: ${user}`);
  }
}
```

## Bad solution

Creating deep or broad inheritance hierarchies to share code.

```ts
// Bad: Inheritance forcing a rigid structure
class BaseHandler {
  log(message: string) {
    console.log(message);
  }
  authenticate(user: string) {
    /* ... */
  }
}

class UserHandler extends BaseHandler {
  handle(user: string) {
    this.authenticate(user); // Inherited
    this.log(`Handled user: ${user}`); // Inherited
  }
}
```

## Impact

- **[Flexibility](../../home/impact/positive/flexibility.md)**: Composed objects can be easily reconfigured or replaced without breaking the inheritance chain.
- **[Reusability](../../home/impact/positive/reusability.md)**: Small, focused components can be reused across different parts of the application more easily than base classes.
- **[Testability](../../home/impact/positive/testability.md)**: Independent components are easier to unit test and mock.
- **[Coupling](../../home/impact/negative/coupling.md)**: Reduces tight coupling between classes, making the system more resilient to changes.

## Exceptions

- When using frameworks that mandate inheritance (e.g., some UI frameworks or ORMs).
- Very simple "is-a" relationships where the hierarchy is guaranteed to remain shallow.

## References

- [Wikipedia: Composition over inheritance](https://en.wikipedia.org/wiki/Composition_over_inheritance)
- [Refactoring Guru: Replace Inheritance with Delegation](https://refactoring.guru/replace-inheritance-with-delegation)
- [Wikipedia: Design Patterns: Elements of Reusable Object-Oriented Software by Gamma et al. (The "Gang of Four" book)](https://en.wikipedia.org/wiki/Design_Patterns)
