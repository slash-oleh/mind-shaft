# Limit component variations

## TLDR

Standardize on a small set of well-defined component variants. Avoid creating multiple components or variations that serve the same underlying purpose.

## Problem

When a codebase contains dozens of slightly different buttons, cards, or inputs, the user experience becomes fragmented. Users must learn the meaning of each subtle variation, which increases cognitive friction. For developers, "variant sprawl" makes the design system difficult to learn, leads to code duplication, and makes global design updates (like changing a corner radius) a nightmare to implement consistently.

## Good solution

Define a few core variants for each component that cover 90% of use cases. Use clear semantic names like `primary`, `secondary`, and `outline`.

```jsx
// Good: A single Button component with a few semantic variants
<Button variant="primary">Submit</Button>
<Button variant="secondary">Cancel</Button>
<Button variant="outline">Learn More</Button>
```

```jsx
// Good: Reusing a standard Card component for different content
<Card variant="elevated">
  <UserHeader />
</Card>
<Card variant="elevated">
  <ProductDescription />
</Card>
```

## Bad solution

Creating one-off components or ad-hoc variants for every minor design tweak in a mockup.

```jsx
// Bad: Multiple specialized components that are almost identical
<BigBlueButton>Save</BigBlueButton>
<SmallRoundedButton>Cancel</SmallRoundedButton>
<HeaderProfileCard />
<ProductDisplayCard />
```

## Impact

- **[Consistency](../../home/impact/positive/consistency.md)**: A uniform set of components makes the application feel cohesive and predictable for the user.
- **[Maintainability](../../home/impact/positive/maintainability.md)**: Reducing the number of unique components significantly lowers the long-term maintenance burden and build size.
- **[KISS](../../home/impact/positive/kiss.md)**: A streamlined design system is easier for new developers to understand and use correctly.

## Exceptions

- **Complex Domain-Specific Components**: Highly specialized data visualizers or editors may require unique variations that don't fit the general UI kit.
- **Marketing/Landing Pages**: One-off "hero" sections or promotional elements may legitimately deviate from the core app's component set to create a specific brand impact.
