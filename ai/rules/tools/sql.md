---
description: "Tools: SQL"
---

- **Avoid storing derived state in the database**: Calculate state dynamically at runtime instead of saving derived or redundant values in the database schema.
- **Keep UTC offset for timestamps**: Store all timestamps in UTC or with an explicit timezone offset.
- **Prefer class table inheritance**: Use **Class Table Inheritance** for mapping object-oriented inheritance models or polymorphic relationships into a relational database.
- **Prefer domain-level default values over database-level**: Define default values for entity attributes in the application domain layer rather than using database-level schema constraints.
- **Use database constraints**: Use foreign keys, unique constraints, and check constraints to enforce data integrity and validity at the schema level.
- **Use enum for rarely changed sets only**: Use database enums exclusively for static domain concepts and reference tables with foreign keys for dynamic or frequently updated sets of values.
- **Use _id suffix for foreign key fields**: Append the `_id` suffix (or `Id` in camelCase contexts) to all columns storing a foreign key reference.
- **Use indexes carefully**: Balance read performance with write latency by strategically indexing columns based on query patterns.
- **Use meaningful names for junction tables**: Name many-to-many junction tables based on the relationship they represent instead of just concatenating the names of the connected tables.
- **Use NOT NULL constraints by default**: Define database columns as `NOT NULL` by default to reduce ambiguity and simplify application logic.
- **Use proper data types**: Choose the most specific, semantically correct data type for storing and transferring information instead of using generic primitives like `text` or `number`.
- **Use singular form for table names**: Name database tables using singular nouns to represent a single row's entity type.
- **Use snake case for identifiers**: Use `snake_case` for all database identifiers, including tables, columns, constraints, sequences, and indexes.
