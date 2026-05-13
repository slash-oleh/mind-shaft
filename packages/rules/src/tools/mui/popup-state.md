# Popup state

## TLDR

For popovers or menus, always use `material-ui-popup-state`. Avoid manual anchor element and open state management. Good: `<Menu {...bindMenu(popupState)} />`. Bad: `<Menu anchorEl={anchorEl} open={open} />`.

## Problem

MUI popovers, menus, poppers require manual `anchorEl` and `open` state. Complex boilerplate. Error-prone synchronization. Multiple popups management hard.

## Good solution

Use `material-ui-popup-state` hook. Handles state, anchor, event binding automatically.

```tsx
import {
  usePopupState,
  bindTrigger,
  bindMenu,
} from 'material-ui-popup-state/hooks';

const MyComponent = () => {
  const popupState = usePopupState({ variant: 'menu', popupId: 'demoMenu' });

  return (
    <>
      <Button {...bindTrigger(popupState)}>Open Menu</Button>
      <Menu {...bindMenu(popupState)}>
        <MenuItem onClick={popupState.close}>Item 1</MenuItem>
        <MenuItem onClick={popupState.close}>Item 2</MenuItem>
      </Menu>
    </>
  );
};
```

## Bad solution

Manual `useState` with `anchorEl`. Logic scattered across handlers.

```tsx
const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
const [open, setOpen] = useState(false);

const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
  setAnchorEl(event.currentTarget);
  setOpen(true);
};

const handleClose = () => {
  setAnchorEl(null);
  setOpen(false);
};

return (
  <>
    <Button onClick={handleClick}>Open Menu</Button>
    <Menu
      anchorEl={anchorEl}
      open={open}
      onClose={handleClose}
    >
      <MenuItem onClick={handleClose}>Item 1</MenuItem>
      <MenuItem onClick={handleClose}>Item 2</MenuItem>
    </Menu>
  </>
);
```

## Impact

- **Readability**: Declarative bindings reduce logic noise.
- **Maintainability**: Centralized state management prevents synchronization bugs.
- **Consistency**: Unified pattern for all popups.

## Exceptions

- **Custom complex triggers**: Binding helpers lack support for specific interaction (e.g. hover with delay).
- **Non-MUI popups**: Library designed for MUI.

## References

- [material-ui-popup-state: Documentation](https://github.com/jcoreio/material-ui-popup-state)
