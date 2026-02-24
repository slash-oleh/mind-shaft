# Forward remaining props to the underlying element

When building components that wrap other elements, whether they are native HTML tags or other custom components, always forward unhandled properties (`...restProps`) to the primary child. This ensures that the wrapper remains transparent and preserves the full API of the component it encapsulates.

## Problem

Wrapper components often accidentally "mask" the API of the element they wrap. If your component only accepts a few explicit props, consumers lose access to all the other standard attributes (for HTML tags) or specialized props (for custom components). This forces you to manually "re-export" every single prop through your wrapper's interface, creating immense boilerplate and fragile code. If the underlying component is updated with new features, your wrapper blocks them until you manually update it as well.

## Good solution

Inherit from the underlying component's props and forward any unused properties using the spread operator. This ensures the wrapper remains a transparent and fully functional "proxy" for the component it encapsulates.

```tsx
interface CardProps {
  title: string;
  children: ReactNode;
  theme?: 'light' | 'dark';
}

// Good: Inherits CardProps and forwards ...restProps
interface ProfileCardProps extends CardProps {
  userId: string;
}

export const ProfileCard = ({ userId, ...restProps }: ProfileCardProps) => {
  return (
    <Card {...restProps}>
      User Profile: {userId}
    </Card>
  );
};
```

## Bad solution

Manually re-declaring only a portion of the underlying props and failing to provide a path for others to pass through.

```tsx
// Bad: Does not inherit CardProps; manually picks specific props
interface ProfileCardProps {
  userId: string;
  title: string;
}

export const ProfileCard = ({ userId, title }: ProfileCardProps) => {
  return (
    <Card title={title}> {/* theme and children are lost */}
      User Profile: {userId}
    </Card>
  );
};
```

## Why

- **[Maintainability](../../home/quality-attributes/positive/maintainability.md)**: Automatically supports new props added to the underlying component without requiring changes to the wrapper.
- **[Reusability](../../home/quality-attributes/positive/reusability.md)**: Allows your wrapper to be used in diverse contexts that require specific combinations of the underlying props.

## Exceptions

- **Strict Prop Validation**: High-level business components where you intentionally want to restrict the API to prevent consumers from interfering with internal styling or behavior (e.g., a complex `FeatureDashboard`).
- **Prop Overlapping**: If your component uses a prop name that conflicts with a native attribute but has a different meaning, you must explicitly handle or filter that prop to avoid passing invalid data to the DOM.

## References

- [LinkedIn: Proxy component pattern by Manoj Kumar Patra](https://www.linkedin.com/pulse/14-react-patterns-every-developer-should-know-manoj-kumar-patra)
