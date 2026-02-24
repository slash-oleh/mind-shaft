# Use database constraints

Enforce data integrity, consistency, and validity at the schema level by utilizing foreign keys, unique constraints, and check constraints.

## Problem

Relying solely on application-level validation to maintain data integrity is risky. Application bugs, race conditions, or direct database manipulations can bypass these checks, leading to "orphaned" records (referential integrity failure), duplicate entries, or semantically invalid data (e.g., negative prices or invalid email formats). Once inconsistent data enters the database, it becomes expensive to clean up and can cause unpredictable failures across different parts of the system.

## Good solution

Use the database's native constraint system to define the "rules of truth" for your data. This ensures that the database remains consistent regardless of which application or service is accessing it.

```text
-- GOOD: Enforcing rules at the schema level
products:
  id: uuid PRIMARY KEY
  category_id: uuid NOT NULL REFERENCES categories(id) -- Foreign Key
  slug: varchar(255) NOT NULL UNIQUE -- Unique Constraint
  price: numeric NOT NULL CHECK (price >= 0) -- Check Constraint
  discount_price: numeric CHECK (discount_price <= price) -- Multi-column Check
```

By using these constraints:

- **Foreign Keys**: Prevent deleting a category if it still has products.
- **Uniques**: Ensure no two products share the same URL slug.
- **Check Constraints**: Guarantee that prices are never negative and discounts never exceed the base price.

## Bad solution

Ignoring database constraints and attempting to handle all validation in the application code.

```text
-- BAD: No protection against invalid or orphaned data
products:
  id: uuid
  category_id: uuid -- If the category is deleted, this becomes orphaned
  slug: varchar(255) -- Risk of duplicate slugs if code fails
  price: numeric -- Risk of negative values
```

This approach leads to catastrophic data corruption over time, as there is no final "gatekeeper" to verify the data's validity before it is persisted.

## Why

- **[Integrity](../../home/quality-attributes/positive/integrity.md)**: Guarantees that relationships between tables remain valid (referential integrity).
- **[Consistency](../../home/quality-attributes/positive/consistency.md)**: Ensures that data follows a uniform set of rules across the entire system.
- **[Robustness](../../home/quality-attributes/positive/robustness.md)**: Acts as a final layer of defense against application bugs.
- **[Reliability](../../home/quality-attributes/positive/reliability.md)**: Prevents the introduction of "ghost" data that can cause runtime crashes.

## Exceptions

- **NoSQL Databases**: Many non-relational databases do not support traditional foreign keys or complex check constraints.
- **High-Performance Large Scale Writes**: In extremely rare cases of massive scale, checking constraints on every write can become a bottleneck, and integrity might be managed asynchronously (though this is an advanced trade-off).

## References

- [PostgreSQL: Constraints](https://www.postgresql.org/docs/current/ddl-constraints.html)
- [Wikipedia: Referential Integrity](https://en.wikipedia.org/wiki/Referential_integrity)
- [W3Schools: SQL CHECK Constraint](https://www.w3schools.com/sql/sql_check.asp)
