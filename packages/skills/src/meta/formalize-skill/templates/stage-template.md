---
title: 'Phase template'
---

# Phase {{ORDER}}: {{NAME}}

## Goal

{{GOAL_DESCRIPTION}}

## Skip Conditions

{{CRITERIA}}

## Steps

### Step {{ORDER}}: {{ACTION}}

{{STEP_DESCRIPTION}}

## Output

JSON format:

```jsonc
{
  "{{FIELD_1}}": "{{TYPE}}", // {{DESCRIPTION}}
  "{{FIELD_2}}": {
    "{{SUB_FIELD}}": "{{TYPE}}", // {{DESCRIPTION}}
  }, // {{DESCRIPTION}}
}
```

OR

Markdown format:

- {{H2_TITLE_1}}: {{OUTPUT_DESCRIPTION}}
  - {{H3_TITLE_2}}: {{OUTPUT_DESCRIPTION}}
    {{H3_CONTENT}}: {{OUTPUT_DESCRIPTION}}
    - {{H4_TITLE_3}}: {{OUTPUT_DESCRIPTION}}
- {{H2_TITLE_4}}: {{OUTPUT_DESCRIPTION}}
