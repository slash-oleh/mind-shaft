# Avoid storing derived state in the database

## TLDR

Calculate state dynamically at runtime instead of saving derived or redundant values in the database schema.

## Problem

Storing derived state e.g., a "status" column that simply reflects whether `suspended_at` is set, or a "total\_amount" that is the sum of a user's `order_items` violates the single source of truth principle. When the underlying data changes, the derived state must be explicitly updated in parallel. If a transaction fails, a bug occurs, or a developer runs a manual query without updating the derived column, the database becomes inconsistent. You are then left with conflicting data and synchronization issues.

## Good solution

Store only the raw, fundamental data points. Derive the complex state dynamically in the application layer, through database views, or using computed/virtual columns when queried.

```text
user:
  id
  is_active
  suspended_at

# The 'status' (e.g. "Active", "Suspended") is calculated
# at runtime based on the boolean flags and timestamps.
```

## Bad solution

Storing both the individual data points and the combined derived state, requiring complex synchronization logic to keep them matching.

```text
user:
  id
  is_active
  suspended_at
  status # Fragile: Must be updated every time `is_active` or `suspended_at` changes
```

## Impact

- **[Integrity](../../home/impact/positive/integrity.md)**: Prevents data anomalies where base values and derived state contradict each other.
- **[Maintainability](../../home/impact/positive/maintainability.md)**: Simplifies update operations, as you only need to modify the base data without managing cascading state updates.
- **[KISS](../../home/impact/positive/kiss.md)**: Reduces the need for database triggers or complex application-level synchronization logic.
- **[Consistency](../../home/impact/positive/consistency.md)**: There is only one source of truth for any given piece of information.

## Exceptions

- **Performance Optimization**: If calculating the derived state is extremely expensive (e.g., aggregating millions of rows for a frequently accessed metric), you might need to materialize the state. In this case, use specialized mechanisms like Materialized Views, caching layers (like Redis), or careful event-driven synchronization.

## References

- [Wikipedia: Database Normalization](https://en.wikipedia.org/wiki/Database_normalization)
- [Wikipedia: Single Source of Truth](https://en.wikipedia.org/wiki/Single_source_of_truth)
