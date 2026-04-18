---
description: "Tools: Sql"
---

# Tools: Sql

## Avoid storing derived state in the database
Calculate state dynamically at runtime instead of saving derived or redundant values in the database schema.
[read more](https://github.com/insolite/dev-rules/blob/main/src/tools/sql/avoid-storing-derived-state-in-the-database.md)

## Keep UTC offset for timestamps
Store all timestamps in UTC or with an explicit timezone offset.
[read more](https://github.com/insolite/dev-rules/blob/main/src/tools/sql/keep-utc-offset-for-timestamps.md)

## Prefer class table inheritance
Use **Class Table Inheritance** for mapping object-oriented inheritance models or polymorphic relationships into a relational database.
[read more](https://github.com/insolite/dev-rules/blob/main/src/tools/sql/prefer-class-table-inheritance.md)

## Prefer domain-level default values over database-level
Define default values for entity attributes in the application domain layer rather than using database-level schema constraints.
[read more](https://github.com/insolite/dev-rules/blob/main/src/tools/sql/prefer-domain-level-default-values-over-database-level.md)

## Use database constraints
Use foreign keys, unique constraints, and check constraints to enforce data integrity and validity at the schema level.
[read more](https://github.com/insolite/dev-rules/blob/main/src/tools/sql/use-database-constraints.md)

## Use enum for rarely changed sets only
Use database enums exclusively for static domain concepts and reference tables with foreign keys for dynamic or frequently updated sets of values.
[read more](https://github.com/insolite/dev-rules/blob/main/src/tools/sql/use-enum-for-rarely-changed-sets-only.md)

## Use _id suffix for foreign key fields
Append the `_id` suffix (or `Id` in camelCase contexts) to all columns storing a foreign key reference.
[read more](https://github.com/insolite/dev-rules/blob/main/src/tools/sql/use-id-suffix-for-foreign-key-fields.md)

## Use indexes carefully
Balance read performance with write latency by strategically indexing columns based on query patterns.
[read more](https://github.com/insolite/dev-rules/blob/main/src/tools/sql/use-indexes-carefully.md)

## Use meaningful names for junction tables
Name many-to-many junction tables based on the relationship they represent instead of just concatenating the names of the connected tables.
[read more](https://github.com/insolite/dev-rules/blob/main/src/tools/sql/use-meaningful-names-for-junction-tables.md)

## Use NOT NULL constraints by default
Define database columns as `NOT NULL` by default to reduce ambiguity and simplify application logic.
[read more](https://github.com/insolite/dev-rules/blob/main/src/tools/sql/use-not-null-constraints-by-default.md)

## Use proper data types
Choose the most specific, semantically correct data type for storing and transferring information instead of using generic primitives like `text` or `number`.
[read more](https://github.com/insolite/dev-rules/blob/main/src/tools/sql/use-proper-data-types.md)

## Use singular form for table names
Name database tables using singular nouns to represent a single row's entity type.
[read more](https://github.com/insolite/dev-rules/blob/main/src/tools/sql/use-singular-form-for-table-names.md)

## Use snake case for identifiers
Use `snake_case` for all database identifiers, including tables, columns, constraints, sequences, and indexes.
[read more](https://github.com/insolite/dev-rules/blob/main/src/tools/sql/use-snake-case-for-identifiers.md)
