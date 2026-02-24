# Use enum for rarely changed sets only

## TLDR

Use database enums exclusively for static domain concepts and reference tables with foreign keys for dynamic or frequently updated sets of values.

## Problem

Adding, renaming, or removing values from a database enum requires structural database migrations. In many database systems (like PostgreSQL), altering an enum type can be complex, lock tables, or be outright impossible for certain operations (like removing a value without recreating the entire type). If the set of allowed values changes frequently based on business requirements, treating them as structural database types forces developers to write migrations constantly. Changing a code value or a lookup table row is significantly easier and safer than performing a database schema migration.

## Good solution

Use enums for static, universally understood states (e.g., predefined in the real world, such as days of the week). For business entities that might expand (e.g., categories, tags, user roles), use a dedicated reference table.

```sql
-- Good: Enum for a static, immutable, real-world concept
CREATE TYPE day_of_week AS ENUM ('monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday');
CREATE TABLE schedule (
    id UUID PRIMARY KEY,
    day day_of_week NOT NULL
);

-- Good: Reference table for dynamic business concepts
CREATE TABLE product_category (
    id UUID PRIMARY KEY,
    name VARCHAR(255) UNIQUE NOT NULL
);
CREATE TABLE product (
    id UUID PRIMARY KEY,
    category_id UUID REFERENCES product_category(id)
);
```

## Bad solution

Using an enum for a list of values that is highly likely to change as the business evolves, such as a list of product categories or supported integrations.

```sql
-- Bad: Enum for dynamic data that will frequently require migrations to update
CREATE TYPE product_category_enum AS ENUM ('electronics', 'clothing', 'home_goods', 'toys');
CREATE TABLE product (
    id UUID PRIMARY KEY,
    category product_category_enum NOT NULL
);
```

## Impact

- **[Maintainability](../../home/impact/positive/maintainability.md)**: Prevents the need for complex database migrations every time a new business category or option is introduced.
- **[Flexibility](../../home/impact/positive/flexibility.md)**: Allows administrators or application logic to add new reference values at runtime without developer intervention.
- **[KISS](../../home/impact/positive/kiss.md)**: Keeps the database schema simple and focused on structure rather than volatile data.

## Exceptions

- **Strict Type Safety Requirements**: If you are using an ORM or code generator that relies heavily on database enums to generate application-level types, and the rate of change is manageable (e.g., once every few months), the benefit of end-to-end type safety might outweigh the cost of occasional migrations.
