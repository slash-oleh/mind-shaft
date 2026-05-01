---
description: "General: Data: Data model design, management. Databases, storages, runtime states."
---

- **Keep schema normalized**: Calculate derived state dynamically at runtime. Avoid storing redundant data in the database. Unless for specific performance needs.
- **Name junction entities**: Name many-to-many entities based on the relationship they represent instead of just concatenating the names of the connected entities.
- **Preserve datetime offset**: For datetime values, store UTC offset along with the value. Store the timestamp itself in UTC and timezone offset along with it.
- **Use Datetime ISO format**: Use the "ISO 8601" format for Date, Time, and Duration representation.
- **Use NOT NULL constraint**: Prefer defining database columns as `NOT NULL` by default to reduce ambiguity, redundancy, and simplify handling special values.
- **Use proper data types**: Choose the most specific, semantically correct data type for storing and transferring information instead of using generic primitives like `text` or `number`.
