# Use singular form for table names

## TLDR

Name database tables using singular nouns to represent a single row's entity type.

## Problem

There is an ongoing debate about whether to use plural (e.g., `users`, `orders`) or singular (e.g., `user`, `order`) names for database tables. Using plural names can lead to inconsistencies and linguistic awkwardness, especially with irregular nouns or complex relationships (e.g., `person` -> `people`, `category` -> `categories`, `equipment` -> `equipment`). It also makes naming conventions clunky when creating models and references, such as `users.id` vs `user.id` or `users_roles` vs `user_role`.

## Good solution

Use the singular form to describe the entity that each row in the table represents.

```text
user
product
category
customer_order
user_role
```

This ensures a direct 1:1 mapping between the table name and the conceptual model it stores: "This is a table containing `user` instances."

## Bad solution

Using plural names, leading to grammatical inconsistencies.

```text
users
products
categories  # Irregular pluralization
people      # Completely different word
user_roles  # Pluralizing only the last word
```

## Impact

- **[Consistency](../../home/impact/positive/consistency.md)**: Singular nouns avoid the linguistic gymnastics of irregular plurals, ensuring every table follows the exact same naming pattern.
- **[KISS](../../home/impact/positive/kiss.md)**: Easier to map table names directly to application models classes (e.g., table `user` -> class `User`).
- **[Readability](../../home/impact/positive/readability.md)**: Queries often feel more natural when referring to an alias of a single row (`SELECT user.id FROM user`).

## Exceptions

- **Legacy Systems**: If an existing database or ORM framework strictly defaults to plural table names (e.g., Ruby on Rails' ActiveRecord or some Laravel conventions), and changing them is excessively difficult.
- **Reserved Keywords**: If the singular name is a reserved SQL keyword (e.g., `user` or `order` in some SQL variants), you may need to use plurals (`users`, `orders`) or add a prefix (`app_user`, `customer_order`) to avoid escaping quotes everywhere.

## References

- [Claravine: Expert Tips on Database Naming Conventions](https://www.claravine.com/database-naming-conventions/)
- [StackOverflow: Table Naming Dilemma: Singular vs. Plural names](https://stackoverflow.com/questions/338156/table-naming-dilemma-singular-vs-plural-names)
