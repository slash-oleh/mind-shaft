# Prop exports

## TLDR

For reusable components, always export prop interfaces or types along with the component. Use `[ComponentName]Props` naming convention. Avoid concealing prop types inside component file. Good: `export interface ButtonProps {}`. Bad: `interface ButtonProps {}`.

## Problem

When prop types are kept private within a component file, developers who want to wrap that component or pass props into it from a parent must use cumbersome utilities like `ComponentProps<typeof Component>` or `React.ElementConfig<typeof Component>`. This makes the codebase harder to maintain, as simple tasks like "composing a component" now require deep knowledge of TypeScript's advanced utility types. It also makes it difficult to define shared prop patterns across multiple files.

## Good solution

Explicitly export the props interface or type. By convention, name it `[ComponentName]Props`.

```tsx
// UserProfile.tsx
export interface UserProfileProps {
  name: string;
  avatarUrl: string;
}

export const UserProfile = ({ name, avatarUrl }: UserProfileProps) => {
  return <aside>{/* ... */}</aside>;
};
```

## Bad solution

Defining the props type locally without an export.

```tsx
// UserProfile.tsx
interface LocalProps {
  // Not exported
  name: string;
  avatarUrl: string;
}

export const UserProfile = ({ name, avatarUrl }: LocalProps) => {
  return <aside>{/* ... */}</aside>;
};
```

## Impact

- **Maintainability**: Makes it effortless for other developers to wrap, extend, or document your components.
- **Readability**: Explicitly exported types act as clear documentation for the component's API.

## Exceptions

- **Extremely trivial internal helpers**: Small, non-exported helper components that will never be used outside of their parent file. However, even in these cases, exporting doesn't hurt.
