# Use explicit callbacks for iterative methods

## TLDR

Always use an explicit callback function when using iterative array methods (`map`, `filter`, `forEach`, etc.) to avoid passing unexpected additional arguments to the handler.

## Problem

Many built-in JavaScript functions and library utilities accept multiple optional arguments. Array methods like `.map(callback)` pass three arguments to their callback: `value`, `index`, and the `array` itself. If you pass a function directly as a reference (e.g., `.map(parseInt)`), that function will receive all three arguments. This frequently leads to subtle bugs, as the `index` might be interpreted as a different parameter (like `radix` in `parseInt`).

## Good solution

Wrap the call in an explicit arrow function to control exactly which arguments are passed.

```typescript
const ids = ['1', '2', '3'];

// GOOD: Explicitly pass only the value
const numbers = ids.map((id) => parseInt(id, 10));

// GOOD: Even for methods that only take one argument, it's safer and more readable
const strings = numbers.map((num) => String(num));
```

## Bad solution

Passing function references directly to iterative methods.

```typescript
const ids = ['1', '2', '3'];

// BAD: index is passed as radix to parseInt
// returns [1, NaN, NaN] (radix 0, 1, 2)
const numbers = ids.map(parseInt);

// BAD: while it might work now, it's fragile if the function signature changes
const strings = numbers.map(String);
```

## Impact

- **[Reliability](../../home/impact/positive/reliability.md)**: Prevents bugs caused by functions receiving unintended additional arguments.
- **[Readability](../../home/impact/positive/readability.md)**: Makes it immediately clear which values are being used and how.
- **[Explicitness](../../home/impact/positive/explicitness.md)**: Explicitly defines the interface between the iteration and the processing logic.

## Exceptions

- **Custom predicates**: When a function is specifically designed to handle the exact signature provided by the iterative method (e.g., a custom `filter(item, index)` utility).
- **Single-argument guaranteed functions**: If you are 100% certain a function only accepts exactly one argument and will never change (though the arrow function is still preferred for consistency).

## References

- [MDN: Array.prototype.map() - Common gotcha](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map#using_parseint_with_map)
- [Jake Archibald: Why you should prefer arrow functions in map](https://jakearchibald.com/2017/await-vs-return-vs-return-await/)
