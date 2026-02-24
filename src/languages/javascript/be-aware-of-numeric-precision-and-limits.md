# Be aware of numeric precision and limits

Understand the limitations of JavaScript's `Number` type (IEEE 754 floating-point) and use appropriate strategies for high-precision or large-integer arithmetic.

## Problem

JavaScript's `Number` type is a 64-bit binary floating-point value. This leads to two major issues:

1. **Precision loss in decimals**: Simple arithmetic like `0.1 + 0.2` results in `0.30000000000000004`, which can cause critical bugs in financial or comparison logic.
2. **Unsafe large integers**: Integers outside the "safe" range (above `2^53 - 1`) lose precision, meaning `9999999999999999` might be treated as `10000000000000000`.

Additionally, the behavior of `NaN` (Not-a-Number) is counter-intuitive (e.g., `NaN !== NaN`), which can lead to undetected errors if not checked correctly.

## Good solution

Use explicit checks for safe ranges, specialized types for large numbers, and epsilon-based comparisons for floats.

```javascript
// GOOD: Use BigInt for integers beyond 2^53 - 1
const hugeNumber = 9007199254740993n;

// GOOD: Use a library (e.g., decimal.js) for financial calculations
const total = new Decimal(0.1).plus(0.2); // results in exactly 0.3

// GOOD: Compare floats using Number.EPSILON
const isEqual = Math.abs((0.1 + 0.2) - 0.3) < Number.EPSILON;

// GOOD: Use Number.isNaN() for reliable checks
if (Number.isNaN(result)) {
  handleError();
}
```

## Bad solution

Assuming standard arithmetic is always precise for decimals or very large integers.

```javascript
// BAD: Direct comparison of floats
if (0.1 + 0.2 === 0.3) {
  // This block will NEVER execute
}

// BAD: Precision loss with large numbers
const x = 9999999999999999;
console.log(x); // outputs 10000000000000000

// BAD: Unreliable NaN check
if (result === NaN) {
  // This block will NEVER execute
}
```

## Impact

- **[Reliability](../../home/impact/positive/reliability.md)**: Prevents subtle bugs in financial calculations and large-scale data processing.
- **[Consistency](../../home/impact/positive/consistency.md)**: Ensures predictable behavior across different environments and data ranges.
- **[Integrity](../../home/impact/positive/integrity.md)**: Protects data accuracy when dealing with high-precision requirements.

## Exceptions

- **Non-critical UI values**: Where minor precision loss in positioning or transparency doesn't impact functionality.
- **Small integer ranges**: When you are certain numbers will stay well within the safe integer range (`+/- 9 quadrillion`).

## References

- [MDN: Number.MAX\_SAFE\_INTEGER](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/MAX_SAFE_INTEGER)
- [MDN: BigInt](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/BigInt)
- [Lukas Kollmer: IEEE 754 Visualizer](https://lukaskollmer.de/ieee-754-visualizer/)
