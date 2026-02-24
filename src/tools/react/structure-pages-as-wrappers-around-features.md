# Structure pages as wrappers around features

## TLDR

Organize the pages layer as a thin compositional wrapper around domain-based feature modules to separate routing from business logic.

## Problem

When the boundary between routing entry points (Pages) and business logic (Features) is blurred, the system loses flexibility. If components are organized strictly by page structure (e.g., a folder for every route containing its own forms and hooks), it becomes difficult to share logic between related pages. Conversely, if pages are not isolated as simple wrappers, deleting a route becomes a risky operation that might accidentally break shared logic, making the codebase a rigid monolith rather than a collection of composable parts.

## Good solution

Keep your domain logic and components inside feature modules, and use a separate pages layer to compose these features into final route components. Just as a backend controller shouldn't contain business logic, a frontend page component should focus primarily on data orchestration, layout, and routing-specific concerns.

```text
// Good: Pages compose one or more domain features
src/
  pages/                <-- Composition layer (loose parts)
    SignInPage.tsx      <-- Renders <LoginForm /> from user feature
    SignUpPage.tsx      <-- Renders <SignupForm /> from user feature
    DashboardPage.tsx   <-- Composes <UserSummary /> and <ProductList />
  features/             <-- Domain modules (the "meat" of the app)
    user/
      LoginForm.tsx
      SignupForm.tsx
      UserSummary.tsx
    products/
      ProductList.tsx
```

## Bad solution

Tightly coupling business logic to specific page folders or failing to separate the page wrapper from the feature itself.

```text
// Bad: Feature logic is fragmented across specific page routes
src/
  pages/
    signIn/
      Page.tsx
      LoginForm.tsx     <-- Tightly coupled to this route
    signUp/
      Page.tsx
      SignupForm.tsx    <-- Hard to reuse or move
```

## Impact

- **[Cohesion](../../home/impact/positive/cohesion.md)**: Domain logic remains concentrated in feature modules, while pages remain lightweight and easy to reason about.
- **[Maintainability](../../home/impact/positive/maintainability.md)**: You can safely delete or rename a page file without worrying about losing the underlying business logic.
- **[Scalability](../../home/impact/positive/scalability.md)**: Creating a new page (e.g., a "Quick Sign In" modal or a new dashboard variant) is a matter of composing existing features.

## Exceptions

- **Extremely Simple Apps**: Single-page applications or simple utility tools may not benefit from this two-tier separation.
- **Landing Pages**: One-off marketing pages that don't share components with the rest of the application's domain logic.
