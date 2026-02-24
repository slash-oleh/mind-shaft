# Follow code conventions

## TLDR

Adhere to the standard naming, formatting, and structural conventions of the programming language being used.

## Problem

Ignoring standard language conventions makes the codebase feel inconsistent and increases the cognitive effort required to read it. When code violates expected patterns, such as using `snake_case` in a `camelCase` ecosystem or forcing Java-style getters into Python, it creates friction during development and code reviews. This non-idiomatic approach often suggests a lack of depth in language knowledge and forces reviewers to focus on stylistic "noise" rather than the actual business logic, ultimately slowing down the team and making the project harder to board.

## Good solution

Use the idiomatic syntax and naming patterns recommended by the language's core community.

```javascript
const activeUsers = [];
function addUser(user) {
  activeUsers.push(user);
}
```

```python
active_users = []
def add_user(user):
    active_users.append(user)
```

## Bad solution

Forcing conventions from other languages or using inconsistent styles that violate ecosystem norms.

```javascript
const active_users = [];
function add_user(user) {
  active_users.push(user);
}
```

```python
activeUsers = []
def addUser(user):
    activeUsers.append(user)
```

## Impact

- **[Readability](../../home/impact/positive/readability.md)**: Standard patterns allow the brain to filter out boilerplate and focus on business logic.
- **[Maintainability](../../home/impact/positive/maintainability.md)**: Simplifies onboarding and reduces stylistic friction in code reviews.

## Exceptions

- **External Interoperability**: When naming must match an external API, database schema, or legacy system that uses a different convention.

## References

- [Google: JavaScript Style Guide](https://google.github.io/styleguide/jsguide.html)
- [Guido van Rossum: PEP 8 – Style Guide for Python Code](https://peps.python.org/pep-0008/)
