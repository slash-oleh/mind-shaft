# Apply clean architecture approaches

Ensure that business logic (the domain) is strictly separated from infrastructure concerns like HTTP handling, database queries, and external APIs.

## Problem

Mixing business logic with infrastructure makes the code hard to test, difficult to maintain, and tightly coupled to specific technologies. Changes in infrastructure (e.g., switching from REST to GraphQL or changing the database) often require rewriting core logic, leading to fragile and unmanageable codebases.

## Good solution

Implement layers (Domain, Infrastructure, Application/Adapters) to isolate business rules. Use services for domain logic and repositories for data access, ensuring that the domain doesn't depend on technical implementation details.

```ts
// Web framework (Infrastructure)
const web = async (request) => {
  const data = JSON.parse(request.body);
  return JSON.stringify(loginController(data));
};

// Data (Infrastructure)
const sessionRepository = async (token) => {
  const { exists } = await query(
    'SELECT exists(id) FROM session WHERE token = ?',
    [token],
  );
  return exists;
};

// Service (Domain)
const loginService = async (token) => {
  if (!/^[A-Za-z\d]+$/.exec(token)) {
    throw Error('Token validation failed');
  }
  return await sessionRepository(token);
};

// Controller (Adapter)
const loginController = async (data) => {
  const { token } = data;
  return loginService(token);
};
```

## Bad solution

Combining request parsing, validation, business logic, and database queries in a single "handler" or function.

```ts
const loginHandler = async (request) => {
  // HTTP request parsing (Infrastructure)
  const data = JSON.parse(request.body);
  const { username } = data;

  // Validation (Domain/Application)
  if (!/^[A-Za-z\d]+$/.exec(username)) {
    throw Error('Username validation failed');
  }

  // Data fetching (Infrastructure)
  const { passwordHash } = await query(
    'SELECT password_hash FROM user WHERE email = ?',
    [username],
  );
  // ...
};
```

## Why

- **[Separation of concerns](../../home/quality-attributes/positive/separation-of-concerns.md)**: Each component has a single, well-defined responsibility, making the system easier to understand.
- **[Maintainability](../../home/quality-attributes/positive/maintainability.md)**: Easier to update or swap infrastructure components without affecting business logic.
- **[Testability](../../home/quality-attributes/positive/testability.md)**: Business logic can be tested in isolation (unit tests) without mocking complex infrastructure or relying on a running database.

## Exceptions

- Very small scripts, simple prototypes, or "glue" code where the overhead of architectural layers is disproportionate to the complexity.

## References

- [Robert C. Martin: Clean Architecture](https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html)
