# Junction entities

## TLDR

Always name many-to-many relationships based on business meaning. Avoid lazy concatenating table names. Good: `user <- membership -> group`. Bad: `user <- user_group -> group`.

## Problem

Using generic names like `user_group` or `post_tag` for junction tables only describes the formal database relationship (a connection between two tables). It fails to capture the semantic meaning or the domain-level relationship. As a system grows, these generic names become ambiguous and less helpful for understanding the business logic. For example, if a `user_group` table is used to track memberships, naming it `membership` immediately clarifies its purpose to anyone reading the schema.

## Good solution

Choose a name that represents the business entity or the specific relationship being established.

```text
user:
  id

group:
  id

membership: # Good: describes the relationship
  user_id
  group_id
  role
```

## Bad solution

Concatenating table names without considering the underlying business meaning.

```text
user:
  id

group:
  id

user_group: # Bad: generic mechanical name
  user_id
  group_id
```

## Impact

- **[Readability](../../home/impact/positive/readability.md)**: Developers can understand the purpose of the table and the relationship it represents at a glance.
- **[Explicitness](../../home/impact/positive/explicitness.md)**: The domain model is reflected more accurately in the database schema.
- **[Maintainability](../../home/impact/positive/maintainability.md)**: It is easier to add relationship-specific columns (like `joined_at` or `role`) to a table that represents a meaningful entity.
- **[Consistency](../../home/impact/positive/consistency.md)**: Encourages thinking about data in terms of domain entities rather than just technical links.

## Exceptions

- **Automated Tooling**: Some legacy ORMs or scaffolders enforce a strict `table1_table2` naming convention to automatically detect relationships. If the cost of overriding this exceeds the benefit of clarity, the default may be kept.

## References

- [StackOverflow: Many-to-many table naming convention](https://stackoverflow.com/questions/2121540/many-to-many-table-naming-convention)
- [Guru99: Relational Database Design](https://www.guru99.com/database-design.html)
