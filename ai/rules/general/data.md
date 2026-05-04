---
description: "General: Data: Data model design, management. Databases, storages, runtime states."
---

- **Datetime offsets**: Always store datetime in UTC along with originating offset. Avoid timezone-unaware timestamps unless explicitly defining multi-zone logic. Good: `2024-05-20T14:30:00+02:00`. Bad: `2024-05-20T14:30:00`.
- **ISO datetime format**: Always use ISO 8601 format for dates and durations. Avoid ambiguous, arbitrary formats. Good: `2024-05-20T14:30:00.000Z`; `P3Y6M`. Bad: `05/04/24`; `11:30`.
- **Junction entities**: Always name many-to-many relationships based on business meaning. Avoid lazy concatenating table names. Good: `user <- membership -> group`. Bad: `user <- user_group -> group`.
- **Required attributes**: When possible, use mandatory fields with default values. Avoid nullable or optional properties, unless business logic requires distinct missing state or for backward compatibility. Good: `bio: string = ""`. Bad: `bio?: string | null`.
- **Schema normalization**: Always calculate derived state dynamically. Avoid storing redundant data in database, unless performance optimization requires materialization. Good: `column birth_at; age = now() - birth`. Bad: `column birth_at; column age;`.
- **Specific types**: Always use specific native data types. Avoid generic primitives. Good: `uuid: UUID`, `status: StatusEnum`, `birthAt: DateTime`. Bad: `uuid: string`, `status: string`, `birthAt: number`.
