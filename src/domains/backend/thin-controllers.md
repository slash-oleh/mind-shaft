# Thin controllers

## TLDR

Always delegate logic to services. Avoid controllers aware of more than request/response handling. Good: `userController = { get: (req) => userService.get(req.body) }`. Bad: `userController = { get: (req) => db.user.get(req.id) }`.

## Problem

"Fat controllers" occur when business logic, validation, and data access are tightly coupled with the transport layer (HTTP/GraphQL). This mixing of concerns forces the core application logic to become "trapped" within framework-specific request/response handlers, making it impossible to reuse the logic in other contexts like CLI tools or background jobs. It also makes the code difficult to unit test without complex mocking of the web framework context and leads to a fragile architecture where business rules are directly dependent on the communication protocol.

## Good solution

Keep controllers focused on three tasks: parsing input, calling a service, and formatting the response.

```typescript
// users.controller.ts
export const createUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const user = await UserService.register({ email, password });
  return res.status(201).json(user);
};

// users.service.ts
export class UserService {
  static async register(data) {
    // Business logic, validation, hashing, DB persistence...
    return db.users.create(data);
  }
}
```

## Bad solution

Writing all logic directly inside a controller handler.

```typescript
// users.controller.ts
export const createUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  if (!email.includes('@')) return res.status(400).send('Invalid email');

  const hashedPassword = await hash(password);
  const user = await db.users.create({ email, password: hashedPassword });
  await sendWelcomeEmail(user.email);

  return res.status(201).json(user);
};
```

## Impact

- **[Separation of Concerns](../../home/impact/positive/separation-of-concerns.md)**: Decouples communication from core logic.
- **[Reusability](../../home/impact/positive/reusability.md)**: Services can be called by multiple interfaces.
- **[Testability](../../home/impact/positive/testability.md)**: Services are pure logic, easy to unit test.
- **[Maintainability](../../home/impact/positive/maintainability.md)**: Logic is centralized.

## Exceptions

- **Direct Proxying**: Simple pass-through routes without any logic.
- **Minimal CRUD**: Extremely simple services where abstraction might be overkill.

## References

- [Martin Fowler: Service Layer Pattern](https://martinfowler.com/eaaCatalog/serviceLayer.html)
