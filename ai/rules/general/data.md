---
description: "General: Data: Data model design, management. Databases, storages, runtime states."
---

- **Backups**: For data durability, always maintain automated backups and verify restoration regularly. Avoid unverified backup strategies or manual one-off exports. Good: nightly automated database snapshots with monthly restore tests. Bad: manual SQL dumps stored on same server.
- **Datetime offsets**: Always store datetime in UTC along with originating offset. Avoid timezone-unaware timestamps unless explicitly defining multi-zone logic. Good: `2024-05-20T14:30:00+02:00`. Bad: `2024-05-20T14:30:00`.
- **ISO datetime format**: Always use ISO 8601 format for dates and durations. Avoid ambiguous, arbitrary formats. Good: `2024-05-20T14:30:00.000Z`; `P3Y6M`. Bad: `05/04/24`; `11:30`.
- **Junction entities**: Always name many-to-many relationships based on business meaning. Avoid lazy concatenating table names. Good: `user <- membership -> group`. Bad: `user <- user_group -> group`.
- **Money types**: For financial data, always use integers or strings of minimal currency unit. Never use floating-point numbers for currency arithmetic. Good: `cents = 1050; // $10.50`. Bad: `dollars = 10.50; // $10.50`.
- **Normalization**: For any data or state, define and store it only once. Keep data normalized and use derived values, computed on-the-fly from source. Avoid redundant variables, mirrored runtime or persistent state, or duplicate database columns. Good: `const fullName = user.first + ' ' + user.last`, `SELECT (price * count) AS total FROM orders`. Bad: `const [fullName, setFullName] = useState(firstName + ' ' + lastName); useEffect(() => setFullName(firstName + ' ' + lastName), [firstName, lastName])`, `ALTER TABLE orders ADD COLUMN total`.
- **Required attributes**: When possible, use mandatory fields with default values. Avoid nullable or optional properties, unless business logic requires distinct missing state or for backward compatibility. Good: `bio: string = ""`. Bad: `bio?: string | null`.
- **Specific types**: Always use specific native data types. Avoid generic primitives. Good: `uuid: UUID`, `status: StatusEnum`, `birthAt: DateTime`. Bad: `uuid: string`, `status: string`, `birthAt: number`.
- **Units**: For critical domain values, always include explicit unit in data structure. Avoid allowing plain numbers without attached metadata. Good: `{ amount: 100, currency: 'USD' }`. Bad: `{ price: 100 }`.
- **Validation**: For system safety, integrity and consistency, always validate data at boundaries and before persistence. Avoid trusting external inputs or assuming DTO version compatibility. Good: `UserSchema.parse(data);`. Bad: `data as UserSchema;`.
