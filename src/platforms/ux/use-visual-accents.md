# Use visual accents

## TLDR

Establish hierarchy via size, color, animations to guide attention.

## Problem

Interfaces without a clear visual hierarchy are difficult to scan. When every element has the same weight, size, and color, users must read every word to find what they need. This increases cognitive load, slows down task completion, and often leads to users missing critical information or primary actions.

## Good solution

Establish a clear hierarchy by using bold font weights for headings, brand colors for primary actions, and larger sizes for the most important data points. Use subtle colors and smaller fonts for secondary information.

```jsx
// Good: Clear hierarchy with font weight and color
<ArticleCard>
  <Text
    variant="h2"
    weight="bold"
  >
    The Future of UX
  </Text>
  <Text
    variant="caption"
    color="textSecondary"
  >
    Published Oct 24, 2023
  </Text>
  <Text variant="body">Visual hierarchy is the arrangement of elements...</Text>
  <Button variant="primary">Read More</Button>
</ArticleCard>
```

```jsx
// Good: Using positioning and size to highlight a key metric
<MetricSlot>
  <Label color="textSecondary">Total Revenue</Label>
  <Value
    size="xl"
    weight="bold"
  >
    $42,000
  </Value>
  <Badge trend="up">+12%</Badge>
</MetricSlot>
```

## Bad solution

Using the same styling for all text and elements, making the interface a single, un-scannable block of information.

```jsx
// Bad: No visual accents, everything is equally "important"
<Card>
  <div>The Future of UX</div>
  <div>Published Oct 24, 2023</div>
  <div>Visual hierarchy is the arrangement of elements...</div>
  <button>Read More</button>
</Card>
```

## Impact

- **[Usability](../../home/impact/positive/usability.md)**: A clear hierarchy allows users to scan and find information quickly.
- **[Accessibility](../../home/impact/positive/accessibility.md)**: Visual accents help users with cognitive disabilities focus on the most important content. Note: Always ensure color alone isn't the only way information is conveyed.

## Exceptions

- **Low-Density Data Grids**: In high-density spreadsheets or technical logs, uniform styling may be preferred to allow for maximum information density, though even here, headers should be distinct.
- **Minimalist Branding**: Some extreme minimalist designs deliberately avoid traditional accents, though they usually rely on negative space (positioning) as their primary accent.
