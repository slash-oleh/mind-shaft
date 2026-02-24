# Use IoC for page and navigation

Invert the control of page structure by allowing individual page components to compose their own layouts rather than being injected into a rigid, global wrapper.

## Problem

A common mistake in frontend architecture is using a single, monolithic `MasterLayout` that wraps every route. While this seems convenient for sharing headers and footers, it quickly becomes problematic when specific pages need subtle variations (e.g., a landing page with no header, or a dashboard with a unique sidebar). This leads to "prop drilling" where the global layout is littered with conditional flags like `showHeader={false}` or `sidebarType="minimal"`. The global layout becomes tightly coupled to the requirements of every individual page, making it difficult to maintain and refactor.

## Good solution

Allow the page component to be the "owner" of the structure. Use Inversion of Control (IoC) where the page decides which structural components (Header, Sidebar, Content) it needs and how to group them using shared layout components.

```typescript
// GOOD: Each page is responsible for its own layout composition
const PageLayout = ({ children }) => {
  return (
    <div className="app-container">
      {children}
    </div>
  );
};

const DashboardPage = () => (
  <PageLayout>
    <Sidebar />
    <Header title="Project Overview" />
    <Workspace />
  </PageLayout>
);

const LandingPage = () => (
  <PageLayout>
    <Header title="Welcome" />
    <HeroSection />
    <StandardFooter />
  </PageLayout>
);


const App = () => (
  <Routes>
    <Route path="/dashboard" element={<DashboardPage />} />
    <Route path="/landing" element={<LandingPage />} />
  </Routes>
);
```

## Bad solution

Defining a single wrapper that tries to accommodate every possible page variation through configuration flags or type enums.

```typescript
// BAD: A monolithic wrapper at the top level trying to handle all page layouts
const PageLayout = ({ children }) => {
  const { pathname } = useLocation();
  const isMarketing = pathname === '/landing';

  return (
    <div className="app-container">
      {!isMarketing && <Sidebar />}
      <Header title={isMarketing ? 'Welcome' : 'Project Overview'} />

      <main>{children}</main>

      {isMarketing && <StandardFooter />}
    </div>
  );
};

const DashboardPage = () => (
  <>
    <Chart />
    <Table />
  </>
);

const LandingPage = () => (
  <>
    <HeroSection />
    <FeatureList />
  </>
);

const App = () => (
  <PageLayout>
    <Routes>
      <Route path="/dashboard" element={<DashboardPage />} />
      <Route path="/landing" element={<LandingPage />} />
    </Routes>
  </PageLayout>
);
```

## Impact

- **[Separation of Concerns](../../home/impact/positive/separation-of-concerns.md)**: The global layout doesn't need to know about the requirements of specific pages.
- **[Flexibility](../../home/impact/positive/flexibility.md)**: Pages can easily deviate from the "standard" structure without touching shared code.
- **[Maintainability](../../home/impact/positive/maintainability.md)**: Reduces complex conditional logic in shared components.
- **[Explicitness](../../home/impact/positive/explicitness.md)**: The structure of a page is visible directly in the page component itself, not hidden in a wrapper.

## Exceptions

- **Extremely Simple Apps**: If every single page in the application is identical in structure and will *never* change, a simple wrapper might be sufficient (though IoC is still a safer default).

## References

- [React: Composition vs Inheritance in React](https://reactjs.org/docs/composition-vs-inheritance.html)
- [Wikipedia: Inversion of Control](https://en.wikipedia.org/wiki/Inversion_of_control)
