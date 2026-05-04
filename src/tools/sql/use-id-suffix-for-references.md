# ID suffix

## TLDR

Always append `_id` suffix to foreign key columns. Avoid naming columns after entities. Good: `user_id UUID REFERENCES "user"(id)`. Bad: `user UUID REFERENCES "user"(id)`.

## Problem

When a foreign key column is named after the entity it references (e.g., a column named `user` storing a UUID), it creates ambiguity. In both database contexts and application code, naming a property `user` implies that the property contains the full `User` object or record. When it actually only contains the ID, developers are forced to check the schema to understand the data type. Furthermore, many Object-Relational Mappers (ORMs) rely on the `_id` suffix convention to differentiate between the raw foreign key scalar value (`user_id`) and the loaded relation object (`user`).

## Good solution

Explicitly include `_id` to indicate that the column stores a scalar identifier.

```sql
-- Good: Explicit column name
CREATE TABLE "order" (
    id UUID PRIMARY KEY,
    user_id UUID NOT NULL REFERENCES "user"(id)
);
```

## Bad solution

Naming the foreign key column as if it were the full entity object.

```sql
-- Bad: Ambiguous column name
CREATE TABLE "order" (
    id UUID PRIMARY KEY,
    user UUID NOT NULL REFERENCES "user"(id)
);
```

## Impact

- **[Explicitness](../../home/impact/positive/explicitness.md)**: The `_id` suffix immediately tells the developer that the field holds a scalar identifier, not a serialized object or populated relationship.
- **[Maintainability](../../home/impact/positive/maintainability.md)**: Aligns with universal relational database conventions and prevents conflicts with ORMs that need to expose both the ID and the fetched relationship object on the same model.

## Exceptions

- **Composite or Natural Keys**: When the foreign key is a natural, non-scalar identifier (e.g., `iso_currency_code` or `email`) where appending `_id` would be semantically confusing.
- **Legacy Integration**: When consistency with an existing, inherited database schema that uses a different naming pattern is required.
