---
description: "Tools: SQL"
---

- **Limit default values usage**: Prefer domain-level default values over database-level. Define default values for entity attributes in the application domain layer rather than using database-level schema constraints.
- **Limit enum usage**: Use enum for rarely changed sets only like static global domain concepts. Reference tables with foreign keys for dynamic or frequently updated sets of values.
- **Prefer class table inheritance**: Use Class Table Inheritance for mapping object-oriented inheritance models or polymorphic relationships into a relational database.
- **Use database constraints**: Use foreign keys, unique constraints, and check constraints to enforce data integrity and validity at the schema level.
- **Use id suffix for references**: Append the `_id` suffix (or `Id` in camelCase contexts) to all columns storing a foreign key reference.
- **Use indexes carefully**: Balance read performance with write latency by strategically indexing columns based on query patterns.
- **Use singular table names**: Name database tables using singular nouns to represent a single row's entity type.
- **Use snake case identifier names**: Use snake case for all database identifiers, including tables, columns, constraints, sequences, and indexes.
