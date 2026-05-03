# Floating areas

## TLDR

Always prefer inline content. Avoid floating elements like dialogs, popovers covering content, unless absolutely reasoned. Avoid multiple modal areas overlaying each other. Good: Static list. Bad: Floating button covering text.

## Problem

Floating UI elements (modals, dialogs, pop‑overs, tooltips that act as full‑screen overlays) interrupt the user's primary workflow. They require the user to pause the current task, understand a new context, and then dismiss the overlay before returning. When multiple floating layers are stacked (e.g., a modal that opens another modal), the cognitive load spikes, keyboard navigation becomes confusing, and screen‑reader users lose a clear focus order. This often leads to missed actions, accidental dismissals, and a perception of a “cluttered” experience.

## Good solution

Prefer inline, contextual UI patterns that keep the user in the same visual hierarchy. When a modal is truly required, keep it single‑layer.

```jsx
// Good: Settings expand inline, no floating layer
<SettingsPage>
  <Expandable label="Notifications">
    <Toggle label="Email" />
    <Toggle label="Push" />
  </Expandable>
  <Expandable label="Privacy">...</Expandable>
</SettingsPage>
```

```jsx
// Good: A single-layer confirmation for a destructive action
<ConfirmDialog
  trigger={<Button>Delete</Button>}
  message="Are you sure?"
  onConfirm={handleDelete}
/>
```

## Bad solution

Stacking multiple floating layers or using modals for non‑critical interactions.

```jsx
// Bad: A modal opens another modal, user loses context
<Modal trigger={<Button>Edit User</Button>}>
  <UserDetailsForm />
  <Modal trigger={<Button>Change Avatar</Button>}>
    <AvatarUploader />
  </Modal>
</Modal>
```

## Impact

- **[Usability](../../home/impact/positive/usability.md)**: Keeping interactions inline reduces context‑switching friction and improves task flow.
- **[Accessibility](../../home/impact/positive/accessibility.md)**: Screen readers and keyboard navigation handle a single focus layer more reliably than nested dialogs.
- **[Maintainability](../../home/impact/positive/maintainability.md)**: Fewer modal components mean less duplicated overlay logic and fewer edge‑case bugs.

## Exceptions

- **Complex Wizards**: Multi‑step flows that need to isolate the user from the rest of the UI may legitimately use a full‑screen dialog.
- **Third‑party Integrations**: When embedding an external service that only provides a modal UI, you may need to accept that pattern.
