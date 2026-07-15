# Language conventions

## TLDR

Always follow idiomatic syntax and naming patterns of the language. Avoid forcing foreign conventions, unless matching external APIs or legacy systems. Good: camelCase in JS. Bad: snake_case in JS.

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

## Bad solution

Forcing conventions from other languages or using inconsistent styles that violate ecosystem norms.

```javascript
const active_users = [];
function add_user(user) {
  active_users.push(user);
}
```

## Impact

- **Readability**: Standard patterns allow the brain to filter out boilerplate and focus on business logic.
- **Maintainability**: Simplifies onboarding and reduces stylistic friction in code reviews.

## Exceptions

- **External Interoperability**: When naming must match an external API, database schema, or legacy system that uses a different convention.

## References

- [Google: JavaScript Style Guide](https://google.github.io/styleguide/jsguide.html)
