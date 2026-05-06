---
description: "Tools: React: Apply when working with React. Keywords: reactivity, components, hooks, context, providers, rendering lifecycle, other features"
globs:
  - "**/*.js"
  - "**/*.jsx"
  - "**/*.ts"
  - "**/*.tsx"
  - "**/*.cjs"
  - "**/*.mjs"
trigger: model_decision
---

- **Asset referencing**: For images and SVGs, always use direct imports in component files. Avoid raw string paths from public directories. Good: `import logo from './logo.png'`. Bad: `src="/images/logo.png"`.
- **Async effects**: For `useEffect` with async calls, always define self-called function inside. Never make effect callback itself `async`. Good: `useEffect(() => { (async () => {})() }, [])`. Bad: `useEffect(async () => {}, [])`.
- **Async request management**: For data fetching, always use specialized libraries like TanStack Query or SWR. Avoid manual `useEffect` routines and manual data, loading, error helper states. Good: `useQuery()`. Bad: `useEffect(() => { fetch().then(...) })`.
- **Callback memoization**: For functions, when passed to children components or hooks, use `useCallback`. Avoid using by default - only for stabilizing references. Good: `const onUpdate = useCallback(() => {}, []); return <Loader onUpdate={onUpdate}/>`. Bad: `<Loader onUpdate={() => {}} />`, `const renderLoader = useCallback(() => {}, []); return renderLoader();`.
- **Component files**: For components, always use flat files in shared directories. Avoid dedicated folders for single components, unless complex enough to split into helper files. Good: `Button.tsx`. Bad: `Button/index.tsx`.
- **Component logic**: For UI and logic decoupling, always use hooks. Avoid splitting into Container/Presentational component pairs pattern. Good: `useUser` hook in `User` component. Bad: `UserContainer` wrapping `UserView`.
- **Component memoization**: Always wrap functional components in `memo`. Avoid redundant re-renders due to parent re-renders unless using React Compiler. Good: `const Comp = memo(() => {})`. Bad: `const Comp = () => {}`.
- **Component remounting**: Always define component functions at top level or use raw function call to render. Avoid defining inside render cycle along with JSX or `createElement` rendering. Good: `RenderHeader = () => {}; return <>{RenderHeader()}</>`. Bad: `RenderHeader = () => {}; return <><RenderHeader/>{createElement(RenderHeader)}</>`.
- **Controlled components**: For stateful inputs, always use parent state as single source of truth. Avoid setting only initial state nad mirroring changes via `onChange` and `useEffect`. Good: `<input value={v} onChange={c} />`. Bad: `const [v, setV] = useState(props.v)`.
- **Effect dependencies**: For `useEffect` always distinguish between triggers and data sources. Use `useEffectEvent` (or refs) for non-reactive but ref-unstable data. Avoid unnecessary effect executions but keep in mind it should be safe to run as many times as needed. Good: `log = () => {}; useEffectEvent(() => { log(value) }, [value])`. Bad: `log = () => {}; useEffect(() => { log(value) }, [value, log])`.
- **Effects**: For side effects, always prefer event handlers or render-cycle logic. Use useEffect only to synchronize with external systems outside of React. Avoid `useEffect` for computed state, React state synchronization, or resetting and in general if possible. Good: `const total = items.length`. Bad: `useEffect(() => setTotal(items.length), [items])`.
- **Form management**: For non-trivial forms, always use specialized libraries like React Hook Form or Formik. Avoid manual state management for every field, unless form is extremely simple. Good: `useForm({ email, password })`. Bad: `useState('email'); useState('password');`.
- **Functional components**: Always use functional components with Hooks. Avoid Class components, unless maintaining legacy code or implementing Error Boundaries. Good: `const Comp = () => {}`. Bad: `class Comp extends React.Component {}`.
- **Lazy state initialization**: For expensive initial state value calculations, always use function initializer function. Avoid direct function calls for `useState` argument. Good: `useState(() => heavyCompute())`. Bad: `useState(heavyCompute())`.
- **Logic portability**: For logic, always prefer pure functions or services. Use hooks and providers only to bridge React state or lifecycle. Avoid wrapping simple logic in hooks or providers. Good: `formatDate(date)`. Bad: `useDateFormatter(date)`.
- **Logic sharing**: For sharing state and logic, always use custom Hooks. Avoid Higher-Order Components (HOCs), unless used for authentication guards or layout providers. Good: `const user = useAuth()`. Bad: `withAuth(Comp)`.
- **Prop exports**: For reusable components, always export prop interfaces or types along with the component. Use `[ComponentName]Props` naming convention. Avoid concealing prop types inside component file. Good: `export interface ButtonProps {}`. Bad: `interface ButtonProps {}`.
- **Props drilling**: For shared state, always lift to nearest common ancestor. Avoid props drilling by using Context or state management. Good: `Table` manages `Row` selection; `UserAvatar` uses `useUser` hook. Bad: `Row` manages own selection state; `UserAvatar` takes user as a prop provided from `Page` all the way up.
- **Props forwarding**: For wrapper components, always forward supported and unhandled properties using `...restProps`. Avoid picking specific props manually. Good: `({ onClick, ...restProps }) => <Button onClick={onClick} {...restProps} />`. Bad: `({ onClick }) => <Button variant="primary" />`.
- **Props merging**: For wrapper components, always merge incoming props like `className` and event handlers with internal definitions. Avoid unwanted overriding. Good: `className={cx('base', className)}`. Bad: `className="base" {...restProps} // restProps contains className`.
- **Refs**: Always use declarative reactive state. Avoid `useRef`, unless for direct DOM access or specific performance needs. Good: `const [q, setQ] = useState('')`. Bad: `const q = useRef('')`.
- **Render keys**: For lists, use unique and stable identifiers from data for the `key` prop. Avoid using array indices for dynamic or reorderable collections. Good: `<li key={user.id}>`. Bad: `<li key={index}>` for sortable list.
- **Serializable state**: For state and stores, always use serializable data like primitives, plain objects, and arrays. Avoid storing functions, Promises, or Classes. Good: `const [q, setQ] = useState("")`. Bad: `const [element, setElement] = useState(() => <Button />)`.
- **State management**: For global state, always use specialized tools like React Query, Recoil or Zustand. For local state just use plain `useState`. Avoid global mutable variables and Redux, unless maintaining legacy integrations. Good: `useQuery()`. Bad: `dispatch(fetchUser())`.
- **State updaters**: When state depends on previous value, always use updater functions. Avoid referencing stale state variables inside setters. Good: `setCount(prev => prev + 1)`. Bad: `setCount(count + 1)`.
- **Table management**: For complex tables, always use headless libraries like TanStack Table. Avoid manual state management for sorting, pagination, or filtering. Good: `useTable({ columns, rows })`. Bad: `columns = useState(); rows = useState();`.
- **Value memoization**: For expensive calculations or referential stability, always use `useMemo`. Avoid using for primitives and lightweight calculations. Good: `const v = useMemo(() => ({ x: ... }), [x])`. Bad: `const o = {}`, `const v = useMemo(() => x * 100, [x])`.
