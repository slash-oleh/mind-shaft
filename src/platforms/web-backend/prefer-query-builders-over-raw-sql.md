# Prefer query builders over raw SQL

## TLDR

Use query builders for standard database operations to reduce boilerplate, ensure composability, and improve long-term maintainability.

## Problem

While raw SQL is powerful and direct, writing every database operation as a manual string leads to several issues. It results in a significant amount of boilerplate code for simple CRUD operations, making the codebase verbose and harder to scan. Raw SQL strings are also non-composable; dynamic queries (e.g., adding a conditional `WHERE` or `LIMIT` based on user input) usually involve fragile string concatenation that is prone to syntax errors and security vulnerabilities like SQL injection. Over time, teams often end up writing their own set of helpers to manage this complexity, which effectively becomes a poorly-documented, internal query builder.

## Good solution

Use an external, well-documented query builder (like `knex`, `kysely`, or `drizzle`) for standard queries. These tools provide a structured, programmatic way to build SQL, making queries more readable and composable through method chaining.

```typescript
// GOOD: Using a query builder (knex) for a dynamic query
const findUsers = (params: SearchParams) => {
  let query = db('users').select('id', 'name', 'email');

  if (params.role) {
    query = query.where('role', params.role); // Declarative and composable
  }

  if (params.limit) {
    query = query.limit(params.limit);
  }

  return query;
};
```

## Bad solution

Using raw strings for every operation, especially when dealing with dynamic filters or complex branching logic.

```typescript
// BAD: Brittle string concatenation and boilerplate
const findUsers = (params: SearchParams) => {
  let sql = 'SELECT id, name, email FROM users WHERE 1=1';
  const bindings = [];

  if (params.role) {
    sql += ' AND role = ?';
    bindings.push(params.role);
  }

  if (params.limit) {
    sql += ' LIMIT ?';
    bindings.push(params.limit);
  }

  return db.raw(sql, bindings);
};
```

## Impact

- **[Maintainability](../../home/impact/positive/maintainability.md)**: Programmatic query building is easier to read, refactor, and debug than long, interpolated strings.
- **[DRY](../../home/impact/positive/dry.md)**: Reduces the need for repetitive SQL boilerplate for standard operations.
- **[Flexibility](../../home/impact/positive/flexibility.md)**: Query builders make it effortless to compose complex queries from smaller, reusable parts.
- **[Reliability](../../home/impact/positive/reliability.md)**: Built-in parameter binding and syntax validation prevent common errors and security risks.

## Exceptions

- **Highly Complex Queries**: For extremely specialized SQL (like complex window functions, recursive CTEs, or vendor-specific performance optimizations) where a query builder's abstraction becomes a hindrance, using raw SQL is acceptable.
- **One-off migration scripts**: Where the overhead of setting up a query builder might be unnecessary for a single-use operation.

## References

- [Knex.js: Documentation](https://knexjs.org/)
- [Kysely: Why use a query builder?](https://kysely.dev/docs/getting-started)
- [OWASP: SQL Injection Prevention](https://cheatsheetseries.owasp.org/cheatsheets/SQL_Injection_Prevention_Cheat_Sheet.html)
