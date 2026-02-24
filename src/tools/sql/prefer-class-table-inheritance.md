# Prefer class table inheritance

## TLDR

Use **Class Table Inheritance** for mapping object-oriented inheritance models or polymorphic relationships into a relational database.

## Problem

When you need to store different types of entities that share common attributes (e.g., `Vehicle`, `Car`, `Truck`), you must choose how to represent this hierarchy in a relational database. Common alternatives like **Single Table Inheritance** (putting all fields into one giant table with many nullable columns) compromise data integrity. **Concrete Table Inheritance** (each subtype gets its own table with duplicated common fields) leads to schema duplication and makes querying the root entity difficult. Both alternatives create maintenance and integrity challenges as the schema grows.

## Good solution

Use **Class Table Inheritance**. Create a base table for the common attributes and separate subclass tables for the specific attributes. The subclass tables link back to the base table using a foreign key that also serves as their primary key. Conceptually, this is closer to composition than inheritance, which aligns perfectly with maintaining strict relational integrity.

```sql
-- Base table with shared attributes
CREATE TABLE vehicle (
    id UUID PRIMARY KEY,
    type VARCHAR(50) NOT NULL, -- Discriminator column
    manufacturer VARCHAR(255) NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Subclass table linking to base table
CREATE TABLE car (
    vehicle_id UUID PRIMARY KEY REFERENCES vehicle(id),
    number_of_doors INT NOT NULL
);

-- Another subclass table
CREATE TABLE truck (
    vehicle_id UUID PRIMARY KEY REFERENCES vehicle(id),
    payload_capacity_kg INT NOT NULL
);
```

While writing data requires modifying multiple tables, this can be wrapped in a transaction or API layer. Finding a specific entity simply requires a join, which relational databases are highly optimized for.

## Bad solution

**Single Table Inheritance**, which leads to sparse tables filled with `NULL` values and makes it impossible to use `NOT NULL` constraints on subtype-specific fields.

```sql
-- Bad: A single giant table where constraints cannot be enforced
CREATE TABLE vehicle (
    id UUID PRIMARY KEY,
    type VARCHAR(50) NOT NULL,
    manufacturer VARCHAR(255) NOT NULL,
    -- Car specific fields (must be nullable)
    number_of_doors INT,
    -- Truck specific fields (must be nullable)
    payload_capacity_kg INT
);
```

## Impact

- **[Integrity](../../home/impact/positive/integrity.md)**: Allows you to use strict `NOT NULL` constraints for subtype-specific fields, which is impossible in single-table inheritance.
- **[Maintainability](../../home/impact/positive/maintainability.md)**: Shared columns are stored in one place, avoiding the schema duplication found in concrete table inheritance.
- **[Flexibility](../../home/impact/positive/flexibility.md)**: Represents composition more accurately than strict inheritance, making it easier to attach or detach aspects of an entity over time.
- **[Separation of Concerns](../../home/impact/positive/separation-of-concerns.md)**: Each table only stores the attributes relevant to its specific domain.

## Exceptions

- **Performance-critical reads of single massive hierarchies**: If joining the base and subclass tables becomes a proven performance bottleneck (especially for full outer joins across all subtypes, though this indicates a product design issue), you might use indexed views or denormalized read models (CQRS) to accelerate queries, while still maintaining class table inheritance as the write model.
- **Extremely Simple Hierarchies**: If the subclasses barely have any unique fields and are not expected to grow, Single Table Inheritance might be acceptable temporarily, though it should be avoided if strict data integrity is required.

## References

- [TypeDB: Inheritance and polymorphism: where the cracks in SQL begin to show](https://typedb.com/blog/inheritance-and-polymorphism-where-the-cracks-in-sql-begin-to-show)
- [Wikipedia: Composition over inheritance](https://en.wikipedia.org/wiki/Composition_over_inheritance)
