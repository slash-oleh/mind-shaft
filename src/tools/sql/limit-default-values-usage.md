# Limit default values usage

## TLDR

Prefer domain-level default values over database-level. Define default values for entity attributes in the application domain layer rather than using database-level schema constraints.

## Problem

When default values are defined directly on the database schema (e.g., using `DEFAULT` constraints in SQL), the business logic defining what those defaults should be is hidden from the application code. Developers reading the codebase cannot easily see the default state of a new entity. Furthermore, changing a default value requires creating, reviewing, and applying a database migration, which is slower, more complex, and riskier than simply changing an assignment in the application code.

## Good solution

Define defaults within the application code, such as in data transfer objects (DTOs), input schemas, or domain models.

```typescript
class UserInput {
  @Field({
    defaultValue: true,
  })
  active: boolean;
}
```

## Bad solution

Defining defaults directly on the SQL table column using `DEFAULT` constraints, which requires a migration to update later.

```sql
ALTER TABLE "user"
ALTER COLUMN active SET DEFAULT true;
```

## Impact

- **[Maintainability](../../home/impact/positive/maintainability.md)**: Changing a hardcoded value in the application code is significantly easier and safer than performing a database schema migration.
- **[Explicitness](../../home/impact/positive/explicitness.md)**: Developers can see the default values immediately when inspecting the domain models in the codebase.
- **[Cohesion](../../home/impact/positive/cohesion.md)**: Business rules regarding default states are kept closely aligned within the domain layer, rather than leaking into the database infrastructure layer.

## Exceptions

- **Universal infrastructure timestamps**: System-level columns that track immutable database events natively, such as `created_at` or `updated_at`, are often best handled by the database itself (e.g., using `DEFAULT NOW()`).
- **Shared legacy databases**: If multiple independent applications write directly to the same database tables without sharing a unified application layer or service, database-level defaults can be a necessary safeguard to ensure missing data is populated consistently.
