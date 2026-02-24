# Use proper data types

## TLDR

Choose the most specific, semantically correct data type for storing and transferring information instead of using generic primitives like `text` or `number`.

## Problem

Using overly broad or generic data types (like storing a date as a text string, a state as an integer, or a money value as a floating-point number) shifts the burden of validation, formatting, and mathematical correctness entirely into the application layer. Database constraints on loosely typed columns are difficult to enforce. Generic types also destroy the ability to use built-in database functions (like date math or geospatial querying) and cause immense confusion for developers integrating with your data who must guess the format of a generic primitive string or number.

## Good solution

Use explicit, strongly-typed data structures natively provided by the database or language.

- Use explicit `datetime` / `timestamptz` types for dates, rather than Unix timestamps (integers) in the database.
- Use ISO-8601 strings (e.g., `2023-10-31T09:00:00Z`) for datetime in Data Transfer Objects (DTOs), rather than Unix timestamps, to preserve exact semantic readouts and timezone offsets cleanly.
- Use explicit `enum` or string `union` types to represent bounded states, rather than arbitrary numbers (`0`, `1`, `2`).
- Store partial dates (like an expiration month) as a native month-precision `date` (setting the day to `01`), rather than a concatenated year+month `text` string like `"2024-05"`.
- Store monetary values using `decimal`, `numeric`, or integer cents, never `float`.

```sql
-- Good: Highly specific native database types
CREATE TABLE subscription (
    id UUID PRIMARY KEY,
    status subscription_status NOT NULL, -- Enum instead of integer
    monthly_price NUMERIC(10, 2) NOT NULL, -- Numeric instead of float
    expires_on DATE NOT NULL -- Date instead of string 'YYYY-MM'
);
```

## Bad solution

Using the lowest-common-denominator primitive data types, forcing the application to constantly parse and validate.

```sql
-- Bad: Generic primitives lacking semantic meaning and constraints
CREATE TABLE subscription (
    id VARCHAR(255) PRIMARY KEY, -- String instead of UUID
    status INT NOT NULL, -- "Magic generic number" instead of Enum
    monthly_price FLOAT NOT NULL, -- Precision loss risk
    expires_on VARCHAR(7) NOT NULL -- Custom string "2024-05" instead of native date
);
```

## Impact

- **[Type Safety](../../home/impact/positive/type-safety.md)**: Prevents impossible or corrupted data from entering the system at the lowest possible level.
- **[Explicitness](../../home/impact/positive/explicitness.md)**: The data type itself acts as documentation for what the column contains and how it should be used.
- **[KISS](../../home/impact/positive/kiss.md)**: Allows you to leverage native database features (like `DATE_TRUNC`, indexing, and constraint checking) without having to write custom application-level validators and parsers.

## Exceptions

- **External Integration**: When you must match the exact (primitive) data types of a third-party API or legacy system to ensure compatibility and avoid constant mapping overhead.
- **Dynamic Schemas**: Using `JSONB` or `TEXT` for a `metadata` column where the internal structure is legitimately arbitrary or highly volatile and cannot be modeled with specific columns.
