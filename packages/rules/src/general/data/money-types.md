# Money types

## TLDR

For financial data, always use integers or strings of minimal currency unit. Never use floating-point numbers for currency arithmetic. Good: `cents = 1050; // $10.50`. Bad: `dollars = 10.50; // $10.50`.

## Problem

IEEE 754 floating-point numbers cannot represent decimal fractions precisely (e.g. `0.1 + 0.2 !== 0.3`). Accumulating rounding errors lead to incorrect balances and financial discrepancies over time. Native number types often have limited precision for extremely large sums or high-precision crypto-assets.

## Good solution

Store money in smallest units as integers (e.g. cents, satoshis). For high-precision or large values, use arbitrary-precision strings and dedicated math libraries.

```typescript
// GOOD: Amount in cents (integer)
const priceInCents = 2999; // $29.99

// GOOD: High-precision string for storage
const balance = '1234.5678901234567890';
```

## Bad solution

Using floats or doubles for currency storage or calculation.

```typescript
// BAD: Floating point precision risk
const price = 29.99;
const total = price * 3; // Might result in 89.97000000000001
```

## Impact

- **Reliability**: Precise financial calculations without drift.
- **Integrity**: Consistent balances across database and application logic.
- **Maintainability**: Predictable arithmetic behavior.

## Exceptions

- **UI presentation**: Formatting to decimal string or number strictly for display.
- **Aggregated statistics**: Approximations where sub-unit precision is irrelevant (e.g. average revenue per user).

## References

- [Martin Fowler: Money](https://martinfowler.com/eaaCatalog/money.html)
- [StackOverflow: Why not use Double or Float to represent currency?](https://stackoverflow.com/questions/3730019/why-not-use-double-or-float-to-represent-currency)
