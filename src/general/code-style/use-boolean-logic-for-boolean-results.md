# Use boolean logic for boolean results

Prefer boolean operators over ternary operators or conditional statements when the desired outcome is a boolean value.

## Problem

Using ternary operators (`condition ? true : false`) or `if/else` blocks for boolean assignments is unnecessarily verbose. It obscures the direct relationship between the condition and the result, making the code harder to scan and increasing visual noise. This "if-then-true" pattern is a common sign of not fully leveraging the expression-based nature of modern programming languages.

## Good solution

Use logical operators (`&&`, `||`, `!`, `??`) to derive the boolean result directly.

```typescript
// Explicitly derive boolean result
const isAdmin = !!user && user.isAdmin;

// Handle fallback values naturally
const isFeatureEnabled = settings?.enableBeta || false;

// Direct comparison for boolean result
const isAdult = user.age >= 18;
```

## Bad solution

Wrapping boolean results in conditional logic.

```typescript
// Verbose ternary
const isAdmin = user ? user.isAdmin : false;

// Redundant "if-return-true" pattern
let isAdult;
if (user.age >= 18) {
  isAdult = true;
} else {
  isAdult = false;
}
```

## Impact

- **[Readability](../../home/impact/positive/readability.md)**: Reduces cognitive load by expressing logic as a direct mapping.
- **[Explicitness](../../home/impact/positive/explicitness.md)**: Makes it clear that the intent of the statement is to produce a boolean.

## Exceptions

- **Complex Truthiness**: When dealing with legacy APIs where values might be truthy but not strictly boolean, and you specifically need to avoid certain truthy values (though `!!` or explicit comparison is usually better).
- **Readability in edge cases**: Occasionally, a very complex set of logic might be clearer as a well-commented `if/else` if it involves multiple side effects (though this usually indicates it's time for a refactoring).

## References

- [MDN: Logical Operators](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Logical_Operators)
