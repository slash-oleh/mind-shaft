# Required attributes

## TLDR

When possible, use mandatory fields with default values. Avoid nullable or optional properties, unless business logic requires distinct missing state or for backward compatibility. Good: `bio: string = ""`. Bad: `bio?: string | null`.

## Problem

Allowing `NULL` values in columns where an empty value is semantically equivalent (like an empty string for a name, or zero for a count) introduces "double-state" ambiguity. Developers must handle both `null` and an empty value in their code, leading to redundant checks like `if (user.bio !== null && user.bio !== '')`. This complexity leaks into database queries where you must check for `IS NULL OR bio = ''`, making indexes less efficient and queries more error-prone. Databases with many nullable columns often suffer from inconsistent data because it's unclear whether a `NULL` represents a missing value, an unknown value, or just an empty one.

## Good solution

Define columns as `NOT NULL` and provide a sensible default value whenever possible. This ensures that the data always has a predictable, uniform type.

```text
user:
  id: uuid
  username: varchar(255) NOT NULL
  bio: text NOT NULL DEFAULT ''
  points: integer NOT NULL DEFAULT 0
```

By ensuring `bio` is never null, the application logic only ever has to deal with a single "empty" state (the empty string).

## Bad solution

Making columns nullable when the business logic doesn't strictly require a distinction between "unknown" and "empty".

```text
user:
  id: uuid
  username: varchar(255) NULL
  bio: text NULL
  points: integer NULL
```

This forces every consumer of this data to implement special handling for `null` values, increasing the risk of "Cannot read property of null" errors.

## Impact

- **[Consistency](../../home/impact/positive/consistency.md)**: Ensures a single way to represent empty or missing data for a given field.
- **[KISS](../../home/impact/positive/kiss.md)**: Reduces branching logic and boilerplate code in both frontend and backend.
- **[Integrity](../../home/impact/positive/integrity.md)**: Prevents the accidental insertion of "missing" states into required fields.
- **[Robustness](../../home/impact/positive/robustness.md)**: Makes the application more resilient to common null-pointer exceptions.

## Exceptions

- **True Unknowns**: When you absolutely must distinguish between "the user hasn't provided this" (`NULL`) and "the user provided an empty value" (empty string).
- **Optional Foreign Keys**: Columns that link to other tables where the relationship is truly optional.
- **Date/Time**: When a date is not yet known (e.g., `completed_at`), `NULL` is often the only appropriate representation.

## References

- [W3Schools: SQL Not Null Constraint](https://www.w3schools.com/sql/sql_notnull.asp)
- [Ben Nadel: Why Null Values Should Not Be Used in a Database Unless Required](https://www.bennadel.com/blog/85-why-null-values-should-not-be-used-in-a-database-unless-required.htm)
- [Stack Overflow: Is an overuse of nullable columns in a database a code smell?](https://stackoverflow.com/questions/1034925/is-an-overuse-of-nullable-columns-in-a-database-a-code-smell)
