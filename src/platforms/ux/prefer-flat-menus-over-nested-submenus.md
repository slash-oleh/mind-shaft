# Prefer flat menus over nested submenus

## TLDR

Keep navigation shallow by using flat lists with clear grouping instead of nested submenus.

## Problem

Nested submenus (fly‑outs) create a "tunneling" problem: users must move their cursor or finger along a very specific path to reach a submenu item without accidentally closing it. This is physically demanding (violating Fitts's Law) and hides information behind hover or click events, making features less discoverable. On touch devices, submenus often overlap or trigger unexpectedly, leading to a frustrating "guess-and-tap" experience.

## Good solution

Use a flat menu structure with logical groupings. Use headers, separators, or indented styles to indicate relationships without hiding items behind nested layers.

```jsx
// Good: Flat list with clear categorical headers
<Menu>
  <MenuHeader>Cloud Storage</MenuHeader>
  <MenuItem icon={<Upload />}>Upload File</MenuItem>
  <MenuItem icon={<Folder />}>View Documents</MenuItem>

  <MenuSeparator />

  <MenuHeader>Account</MenuHeader>
  <MenuItem icon={<Settings />}>Settings</MenuItem>
  <MenuItem icon={<Logout />}>Sign Out</MenuItem>
</Menu>
```

## Bad solution

Hiding related actions inside a nested submenu that requires a hover/click to reveal.

```jsx
// Bad: Hiding "Documents" inside a "Cloud" submenu
<Menu>
  <SubMenu label="Cloud Storage">
    <MenuItem>Upload File</MenuItem>
    <MenuItem>View Documents</MenuItem>
  </SubMenu>
  <MenuItem>Settings</MenuItem>
  <MenuItem>Sign Out</MenuItem>
</Menu>
```

## Impact

- **[Usability](../../home/impact/positive/usability.md)**: Flat menus improve discoverability and reduce the physical effort required to select an item.
- **[Accessibility](../../home/impact/positive/accessibility.md)**: Screen readers and keyboard users benefit from a linear navigation path rather than managing nested focus layers.

## Exceptions

- **Information Overflow**: When the number of items is so high that a flat list becomes physically impossible to navigate or requires excessive scrolling, nesting may be used to bucket options logically.
- **Complex Domain Tools**: Professional software (e.g., photo editors, IDEs) with hundreds of commands may require nested menus as an industry-standard convention for organizing deep functionality.
- **OS/System Menus**: When building a shell or OS-like interface where users expect standard nested hierarchies (File > New > Project).
