---
description: "Tools: SQL"
---

- Calculate state dynamically at runtime instead of saving derived or redundant values in the database schema.
- Store all timestamps in UTC or with an explicit timezone offset.
- Use **Class Table Inheritance** for mapping object-oriented inheritance models or polymorphic relationships into a relational database.
- Define default values for entity attributes in the application domain layer rather than using database-level schema constraints.
- Use foreign keys, unique constraints, and check constraints to enforce data integrity and validity at the schema level.
- Use database enums exclusively for static domain concepts and reference tables with foreign keys for dynamic or frequently updated sets of values.
- Append the `_id` suffix (or `Id` in camelCase contexts) to all columns storing a foreign key reference.
- Balance read performance with write latency by strategically indexing columns based on query patterns.
- Name many-to-many junction tables based on the relationship they represent instead of just concatenating the names of the connected tables.
- Define database columns as `NOT NULL` by default to reduce ambiguity and simplify application logic.
- Choose the most specific, semantically correct data type for storing and transferring information instead of using generic primitives like `text` or `number`.
- Name database tables using singular nouns to represent a single row's entity type.
- Use `snake_case` for all database identifiers, including tables, columns, constraints, sequences, and indexes.
