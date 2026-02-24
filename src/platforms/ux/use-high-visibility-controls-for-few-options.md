# Use high-visibility controls for few options

Prefer button groups, switches, or radio buttons over dropdowns when dealing with a small, finite number of options (typically 2-5).

## Problem

Dropdowns (select inputs) hide options and require multiple clicks to see and select a value. When used for only a few choices, they hide important information and increase the interaction cost unnecessarily. Users must click once to open the menu, scan the options, and click again to select. This "hide and seek" pattern makes it harder to compare available choices and slows down the user experience.

## Good solution

Use a Button Group (Toggle Button), Switch, or Radio Group to make all choices visible and selectable in a single click.

```jsx
// Good: All options visible at once
<ButtonGroup value={view}>
  <Option value="list">List View</Option>
  <Option value="grid">Grid View</Option>
</ButtonGroup>
```

```jsx
// Good: A switch for binary choices
<Switch label="Enable Notifications" checked={true} />
```

```jsx
// Good: Radio group when there are 3-4 options
<RadioGroup label="Size" orientation="horizontal">
  <Radio value="s">Small</Radio>
  <Radio value="m">Medium</Radio>
  <Radio value="l">Large</Radio>
</RadioGroup>
```

## Bad solution

Using a dropdown for binary or small sets of options.

```jsx
// Bad: Hiding a simple choice inside a dropdown
<Select label="Status">
  <MenuItem value="active">Active</MenuItem>
  <MenuItem value="inactive">Inactive</MenuItem>
</Select>
```

## Impact

- **[Usability](../../home/impact/positive/usability.md)**: Making all options visible reduces the cognitive load required to understand the available choices.
- **[Explicitness](../../home/impact/positive/explicitness.md)**: The current state and alternative options are clearly displayed, making the system's state easier to parse at a glance.

## Exceptions

- **Space Constraints**: When horizontal and vertical space is extremely limited (e.g., a high-density utility bar).
- **Dynamic Lists**: When the list of options is fetched from a server and could potentially grow to exceed 5 items.
- **Mobile Patterns**: In some mobile contexts, a native "Picker" (dropdown) might be easier to interact with if the available screen width is very narrow.
