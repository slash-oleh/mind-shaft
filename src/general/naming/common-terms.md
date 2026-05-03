# Common terms

## TLDR

Always standardize project-wide terms. Use single term for common concepts. Avoid synonyms. Good: `id`, `count`, `get`. Bad: `id+uid`, `count+amount`, `get+fetch`.

## Problem

Using multiple synonyms for the same concept (e.g., `id` vs `uid`, `count` vs `amount`) or varied verbs for the same operation (e.g., `fetch` vs `retrieve` vs `get`) increases cognitive load. It forces developers to constantly check which specific term is used in a given context and makes global searches for concepts less effective. This "synonym-friction" hinders communication and makes the codebase feel fragmented.

## Good solution

Pick one term for each core concept and operation, preferring simple, common words. Trust the established pattern across all modules and layers.

### Common Concepts

- **`id`**: Always use `id`. Avoid `identifier`, `uid`, `pk`.
- **`count`**: Always use `count` for quantities. Avoid `amount`, `sum`, `total`.
- **`name`**: Always use `name` for labels. Avoid `title`, `caption`, `label`.
- **`active`**: Always use `active` for boolean status. Avoid `enabled`, `allowed`.
- **`icon`**: Always use `icon`. Avoid `glyph`, `symbol`, `pictogram`.
- **`unhandled`**: Always use `unhandled`. Avoid `uncaught`, `unexpected`.
- **`*edAt`**: For date/time values. Use `createdAt`, `confirmedAt`. Avoid `confirmTime`, `timeConfirmed`.
- **`*Id`**: For non-object references (foreign keys). Use `roleId`. Avoid `roleReference`, `role`.

### Standard Operation Prefixes

- **`get*`**: For non-boolean operations retrieving data. Avoid `retrieve*`, `extract*`.
- **`set*`**: For mutable operations changing a single value. Avoid `change*`, `update*`.
- **`has*`**: For checking aggregated values or existence in a collection. Avoid `includes*`, `contains`.
- **`create*`**: For factories or adding new entities. Avoid `add*`, `make*`.
- **`update*`**: For complex object change operations. Avoid `change*`, `adjust*`.
- **`delete*`**: For removal operations. Avoid `remove*`, `destroy*`.
- **`is*`**: For boolean-returning operations. Use `isExpired`. Avoid `checkExpired`, `getExpired`.

### Prefer Simple Words

- Use common, simple, short words (e.g., `detectEntity` instead of `distinguishEntity`).

```typescript
// Good: Consistent, standard terms and simple words
const userId = 42;
const itemsCount = items.length;
const userIcon = 'user.svg';
const createdAt = Date.now();
const roleId = 'admin';

const user = await getUser(userId);
if (isExpired(user)) {
  await deleteUser(userId);
}

detectAnomaly(data);
```

## Bad solution

Mixing synonyms for the same concept or using overly complex vocabulary within the project.

```typescript
// Bad: Inconsistent terminology and complex synonyms
const userUid = 42;
const itemsAmount = items.length;
const userGlyph = 'user.svg';
const createTime = Date.now();
const roleReference = 'admin';

const user = await retrieveUser(userId);
if (checkExpired(user)) {
  await destroyUser(userId);
}

distinguishAnomaly(data);
```

## Impact

- **[Consistency](../../home/impact/positive/consistency.md)**: Establishes a shared, predictable vocabulary for the entire team.
- **[Readability](../../home/impact/positive/readability.md)**: Reduces the time spent decrypting intent and makes the code feel cohesive.

## Exceptions

- Matching external API schemas or database column names that use different terms.
- When a domain-specific term has a precise technical meaning that differs from the general one.

## References

- [Naming Cheatsheet: Synonyms](https://github.com/kettanaito/naming-cheatsheet)
- [Naming Cheatsheet: CRUD Verbs](https://github.com/kettanaito/naming-cheatsheet)
