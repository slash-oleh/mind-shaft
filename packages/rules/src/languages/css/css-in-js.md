# CSS-in-JS

## TLDR

Always use CSS-in-JS techniques or at least CSS Modules to bind styling to components. Avoid global CSS for component-specific styles. Good: `const Container = styled.div { ... }`. Bad: `import './styles.css'; <div className="card">`.

## Problem

When writing standard global CSS or even basic SASS, class names are defined as raw strings dynamically matched at runtime. Modern JavaScript bundlers and type-checkers cannot reliably track these string references across large codebases. This results in "dead CSS". Developers become terrified to delete old classes because they have no safe, programmatic way to verify if those classes are still being used by a component. As projects scale, the stylesheet balloons with unused, unremovable legacy code.

## Good solution

Use CSS-in-JS (like Emotion, Styled-Components, or internal UI kit properties) or CSS Modules (`import styles from './Button.module.css'`). This binds CSS class definitions directly to the JavaScript module system.

```tsx
// Good: CSS defined and bound strictly within the component lifecycle and scope
import styled from '@emotion/styled';

const CardContainer = styled.div`
  background: white;
  padding: 16px;
  border-radius: 8px;
`;

function Card({ children }) {
  // If `CardContainer` is removed from this code, the bundler deletes the CSS.
  return <CardContainer>{children}</CardContainer>;
}
```

Or CSS modules:

```tsx
import styles from './Card.module.css';

function Card({ children }) {
  // `styles.card` is a recognized JS object property
  return <div className={styles.card}>{children}</div>;
}
```

## Bad solution

Defining string-based class names in global CSS files that lack static analysis and reference tracking.

```tsx
// Bad: The bundler cannot guarantee if `.card-container` is safe to delete
import './global-styles.css';

function Card({ children }) {
  return <div className="card-container">{children}</div>;
}
```

## Impact

- **Maintainability**: Allows unused classes to be tracked as regular unreachable JavaScript code, which Linters can flag and Tree Shakers can automatically remove during build.
- **KISS**: Eliminates global CSS naming collisions (e.g. BEM methodology becomes unnecessary).

## Exceptions

- **Global resets**: Base HTML element resets (`html`, `body`, `*`) or global font imports must remain in global `.css` files.
