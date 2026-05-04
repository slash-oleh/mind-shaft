---
description: "Languages: CSS: Implies use of CSS Modules, CSS-in-JS, Tailwind CSS, or SCSS/SASS/LESS, but doesn't include their specifics."
---

- **Absolute positioning**: Always use Flexbox, Grid, or spacing for element placement. Avoid `position: absolute` unless for truly floating areas. Good: `.window { display: flex; justify-content: space-between; padding: 8px; &.title {} &.close: {} }`. Bad: `.window .close { position: absolute; top: 8px; right: 8px; }`.
- **Component outer margins**: Always let parent containers decide outer spacing. Never apply margins to root element of reusable components. Good: `.card-list { display: grid; gap: 16px; }`. Bad: `.card { margin: 16px; }`.
- **CSS-in-JS**: Always use CSS-in-JS techniques or at least CSS Modules to bind styling to components. Avoid global CSS for component-specific styles. Good: `const Container = styled.div { ... }`. Bad: `import './styles.css'; <div className="card">`.
- **Important flag**: Always manage CSS specificity via selectors. Avoid `!important` flag, unless fixing 3rd-party styles. Good: `.button { background: blue; &.is-active { background: red; } }`. Bad: `.button { background: blue !important; } .button.is-active { background: red; }`.
- **Padding**: Always use padding on containers for internal space. Avoid margins on child elements. Good: `<div style={{ padding: '24px' }}><h1/></div>`. Bad: `<div><h1 style={{ margin: '24px' }}></div>`.
- **Specificity**: Always structure styles in distinct manner, modularly and additively. Avoid high specificity and property overrides. Good: `button.primary { background: red }`. Bad: `button { background: red }`.
- **Stacking order**: Always centralize `z-index` values into tokens. Avoid arbitrary magic numbers for layer stacking. Good: `zIndex: Z_INDEX.modal`. Bad: `zIndex: 9999`.
- **Style attribute**: For static styling, always provide CSS classes. This often implies CSS-in-JS generating classes dynamically in the end. Avoid `style` attribute, unless for high-frequency dynamic updates. Good: `<div className={styles.container}>`. Bad: `<div style={{ padding: '16px' }}>`.
- **Symmetric spacing**: Always use symmetric padding and `gap` property for distribution. Avoid single-side paddings or margins like `padding-left`. Good: `.cards { display: flex; gap: 16px }`, `.card { padding: 8px 16px }`. Bad: `.card { margin-left: 16px }`, `.card { padding-left: 16px; padding-right: 12px }`.
