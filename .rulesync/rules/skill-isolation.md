---
trigger: always_on
---

# Skill Isolation

- External skills must not reference another skill's internals (scripts, phases, templates).
- Relative `..` paths reaching into a sibling skill dir are the main offender - avoid in particular.
- Treat each skill as opaque. Reuse across skills means: duplicate the needed file, or invoke the other skill as a whole (Skill/Agent tool) - not reach into its files.
