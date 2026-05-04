# Units

## TLDR

For critical domain values, always include explicit unit in data structure. Avoid allowing plain numbers without attached metadata. Good: `{ amount: 100, currency: 'USD' }`. Bad: `{ price: 100 }`.

## Problem

Plain numeric values ambiguous. Developers assume different units (e.g. cents vs dollars, ms vs seconds). Logic errors during conversions hard to catch without type-level or structural enforcement. Variable naming conventions like `priceInCents` easily ignored or misunderstood in complex operations.

## Good solution

Use structures or value objects that pair magnitude with explicit unit.

```typescript
interface Money {
  // Amount in base units (e.g. cents)
  value: number;
  currency: 'USD' | 'EUR' | 'GBP';
}

const processPayment = (price: Money) => {
  // Logic explicitly handles currency
  console.log(`Charging ${price.value} ${price.currency}`);
};
```

## Bad solution

Relying on implicit units or naming conventions.

```typescript
const processPayment = (price: number) => {
  // Is this cents? Dollars? Which currency?
  console.log(`Charging ${price}`);
};
```

## Impact

- **[Reliability](../../home/impact/positive/reliability.md)**: Prevents accidental mixing of incompatible units and conversion bugs.
- **[Readability](../../home/impact/positive/readability.md)**: Data structures self-document required units.
- **[Maintainability](../../home/impact/positive/maintainability.md)**: Simplified auditing of financial or physical logic.

## Exceptions

- **Global constants**: When a single unit is strictly enforced project-wide by infrastructure (e.g. Unix timestamps in milliseconds).
- **Purely mathematical operations**: Abstract calculations where units are irrelevant until the final result.

## References

- [Martin Fowler: Quantity](https://martinfowler.com/eaaDev/Quantity.html)
- [Martin Fowler: Value Object](https://martinfowler.com/bliki/ValueObject.html)
