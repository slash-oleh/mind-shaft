---
description: "Tools: HTML: Markup and DOM specifics."
---

- **Raw elements**: Always encapsulate raw HTML elements into components. Avoid using tags like `div` or `button` directly in application components. Good: `<Image src="logo.png"/><Typography>Motto</Typography>`. Bad: `<img src="logo.png"/><p>Motto</p>`.
- **Semantic navigation**: Always use declarative links and browser history for navigation. Avoid imperative script-driven navigation or local state for UI locations. Good: `<Link href="/profile">`, `<Link href="#checkout">`. Bad: `<Button onClick={() => router.push('/profile')}>`, `router.replace({ state: { checkout: true } })`.
- **Wrappers**: Always use elements to express structure rather than styles. Avoid no-op wrappers like `div` containing single child. Good: `<article className="card"><h2/><p/></article>`. Bad: `<div className="card-wrapper"><div className="card-inner"><article>...</article></div></div>`.
