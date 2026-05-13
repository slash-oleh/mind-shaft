# Disabled controls

## TLDR

Always keep disabled controls visible and provide feedback for why control is disabled. Avoid silent hiding or disabling with no hint. Good: `<Tooltip text="Error"><Button disabled/></Tooltip>`. Bad: `<Button disabled />`, `!disabled && <Button />`.

## Problem

A greyed-out button or input with no context leaves users confused. They can see an action exists but have no idea why it is unavailable or how to unlock it. This leads to frustration, support tickets, and a perception that the application is broken. Screen readers announce the element as "disabled" but offer no further guidance, making the experience even worse for assistive-technology users. An even worse approach is hiding the action entirely so that the user never learns the feature exists, cannot discover how to gain access, and may assume the application simply lacks the capability.

## Good solution

Attach a tooltip, helper text, or inline label that explains the reason for the disabled state and, when possible, tells the user how to resolve it.

```jsx
// Good: Disabled button with a tooltip explaining why
<Tooltip content="Fill in all required fields to enable submission.">
  <Button disabled>Submit</Button>
</Tooltip>
```

```jsx
// Good: Disabled action with inline helper text
<Button disabled>Delete Account</Button>
<HelperText>Only account owners can delete accounts.</HelperText>
```

## Bad solution

Disabling a control with no visible feedback beyond the greyed-out appearance.

```jsx
// Bad: No explanation, user has no idea why the button is disabled
<Button disabled>Submit</Button>
```

## Impact

- **Usability**: Users immediately understand the current state and know what action to take next.
- **Accessibility**: Screen readers can announce the reason, giving assistive-technology users the same information as sighted users.
- **Explicitness**: The interface communicates intent rather than silently blocking interaction.

## Exceptions

- **Universally obvious states**: Controls that are inherently locked by an unambiguous visual context (e.g., a "Next" button on the last step of a wizard that is already visually marked as the final step) may omit the tooltip if the reason is self-evident.
