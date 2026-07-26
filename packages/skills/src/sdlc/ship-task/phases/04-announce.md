# Phase 4: Announce

## Goal

- Prepared ticket comment submitted.

## Steps

### Step 1: Update ticket

Comment:

```
# ... create $TMP with the report text (see ticket-tools' Shell Markdown Bodies pattern) ...
Skill(skill: "ticket-tools", args: "comment <ticketId> $TMP")
```

Change status:

```
Skill(skill: "ticket-tools", args: "change-status <ticketId> acceptance")
```

## Output

JSON format:

```jsonc
{
  "comment_url": "string", // URL to the posted comment
}
```
