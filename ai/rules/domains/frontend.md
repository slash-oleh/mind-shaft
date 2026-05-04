---
description: "Domains: Frontend: Platform-agnostic frontend development. Applicable to Websites, SPAs, desktop apps, mobile apps but not to be specific to one of them."
---

- **Keyboard shortcuts**: Always use multi-key combinations. Avoid single-key hotkeys. Good: `if(ctrl && key=='s')`. Bad: `if(key=='s')`.
- **Layout components**: Always extract layout primitives (like Flex, Grid, Stack). Avoid low-level CSS positioning in business components. Good: `<Stack spacing={2}>`. Bad: `<div style={{ display: 'flex', gap: '16px' }}>`.
- **Layout IoC**: For screens or pages, allow them to control full layout structure by reusing individual components and common layouts. Avoid restricting them to content-only, being automatically injected into a rigid, global wrapper. Good: `DefaultPage = () => <Layout><Header/><Content/></Layout>; AuthPage = () => <DefaultPage><AuthForm/></DefaultPage>`. Bad: `App = () => <Layout><Header/><AuthPage/></Layout>; AuthPage = () => <AuthForm/>`.
- **Layout separation**: Always keep page components thin layout-only layer. Delegate logic to domain feature modules. Think of pages like controllers in backend. Good: `LoginPage = AuthForm + AuthLayout`. Bad: `LoginPage = EmailField + PasswordField + Submit + API`.
- **Pixel perfect**: Always use flexible systematic layouts. Avoid rigid pixel-perfect designs reinforcing design mistakes. Good: `max-width: var(--breakpoint-lg); width: 100%`. Bad: `width: 681px;`.
- **Raster image optimization**: Always use modern formats, responsive sizes, adaptive to actual viewport, lazy loading. Avoid large raw assets, unused trasparency data. Good: `<img src="img.webp" srcset="...">`. Bad: `<img src="original.png">`.
- **Styles encapsulation**: Always encapsulate styles and behavior in reusable components. Reuse components, not styles. Avoid styling markup with disconnected classes defined elsewhere. Good: `<Button size="large" />`. Bad: `<Button className="button-large"/>`.
- **SVG styling**: Always use CSS (`currentColor`) for SVG graphics. Avoid hardcoded fill/stroke attributes inside SVG file. Good: `fill="currentColor"`. Bad: `fill="#FF0000"`.
