# Limit color usage

## TLDR

Use color sparingly. Restrain palette and avoid highlighting too many elements at once.

## Problem

Using too many colors in an interface creates visual noise. When everything is colorful, nothing is highlighted. A "rainbow" UI makes it difficult for users to identify functional elements (like buttons) vs. decorative elements. It also increases cognitive load as users try to decode what each color signifies, leading to confusion and a cluttered, unprofessional appearance.

## Good solution

Stick to a small, curated set of colors. Use a primary brand color for main actions, a neutral range for text and background, and reserved colors for functional feedback (e.g., red for danger, green for success).

```jsx
// Good: Minimal color usage where color denotes action or status
<Dashboard>
  <Sidebar>
    <NavItem active>Overview</NavItem> {/* Uses primary brand color */}
    <NavItem>Analytics</NavItem>
  </Sidebar>
  <MainContent>
    <Card>
      <Text>Daily Progress</Text>
      <ProgressBar
        value={80}
        color="primary"
      />
    </Card>
    <StatusBadge type="success">Live</StatusBadge> {/* Functional color */}
  </MainContent>
</Dashboard>
```

## Bad solution

Applying different colors to various labels, icons, and backgrounds without a clear semantic system.

```jsx
// Bad: Random colors that don't signify meaning
<Card style={{ backgroundColor: '#f0f4ff' }}>
  <Text style={{ color: 'DarkBlue' }}>Welcome</Text>
  <div style={{ color: 'Orange' }}>Warning: System Busy</div>
  <button style={{ backgroundColor: 'Purple' }}>Click Me</button>
  <button style={{ backgroundColor: 'Teal' }}>Learn More</button>
</Card>
```

## Impact

- **[KISS](../../home/impact/positive/kiss.md)**: A limited palette is easier to maintain and results in a cleaner, more focused UI.
- **[Usability](../../home/impact/positive/usability.md)**: Reserved colors (like red for errors) are more effective when the rest of the interface is neutral.
- **[Accessibility](../../home/impact/positive/accessibility.md)**: Fewer colors reduce the chance of poor contrast ratios and make the interface easier to interpret for users with color vision deficiencies.

## Exceptions

- **Data Visualization**: Complex charts and graphs (e.g., heatmaps, multi-series line charts) may require a wider range of colors to differentiate data sets.
- **Highly Playful/Illustrative Brands**: Some brands target children or specific creative audiences where a vibrant, multi-colored interface is part of the intentional aesthetic.
