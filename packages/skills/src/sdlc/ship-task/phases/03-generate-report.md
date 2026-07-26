# Phase 3: Generate Report

## Goal

- Text for ticket comment drafted.
- Links collected.
- Screenshots taken.

## Steps

### Step 1: Draft text

Draft the announcement text to be posted on the ticket.

### Step 2: Collect links

Gather relevant deployed environment URLs, PR links, or artifact links if applicable.

### Step 3: Take screenshots

Take visual proof of the working feature if applicable.

## Output

JSON format:

```jsonc
{
  "report_text": "string", // Drafted text for comment
  "links": {
    "pr_link": "string", // Link to merged PR
    "deploy_link": "string", // Link to deployment
  },
}
```
