# SQL injection

## TLDR

Always use parameterized queries or ORM. Avoid concatenating user input into SQL strings. Good: `WHERE id = ?`, `.where('id', id)`. Bad: `WHERE id = ${id}`.

## Problem

SQL injection occurs when untrusted data is inserted into a database query without proper escaping or parameterization. This allows an attacker to manipulate the query's structure, potentially bypassing authentication, accessing sensitive data, modifying or deleting records, and even gaining administrative control over the database server. String concatenation is the primary source of this vulnerability.

## Good solution

Use parameterized queries (prepared statements) or a trusted ORM. These tools separate the query structure from the data, ensuring that input is treated as a literal value rather than executable code.

```typescript
// Using parameterized queries (Knex example)
db.raw('SELECT id FROM records WHERE name = :name', { name });

// Using ORM methods
db('records').where('name', name).select('id');
```

## Bad solution

Provide user input directly into the query string.

```typescript
// Using string concatenation, vulnerable to SQL injection
const userInput = "' OR role = 'admin' --";
db.raw(`SELECT id FROM users WHERE role = 'member' AND name = '${userInput}'`);
```

## Impact

- **[Security](../../home/impact/positive/security.md)**: Prevents one of the most common and damaging web vulnerabilities.
- **[Reliability](../../home/impact/positive/reliability.md)**: Ensures that special characters in user input (like quotes) don't break the query syntax.

## Exceptions

- None. There is almost never a valid reason to concatenate untrusted input into a SQL query.

## References

- [OWASP: SQL Injection Prevention Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/SQL_Injection_Prevention_Cheat_Sheet.html)
- [Knex.js: Raw Queries and Parameterized SQL](https://knexjs.org/guide/raw.html)
