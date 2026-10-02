# Workflow Manifest

Rules for executing a workflow skill.

## Follow the skill

- Follow skill instructions precisely.
- Skip a step only when the skill defines a skip condition.
- When told to use a specific tool (Skill invocation, CLI command, MCP tool), use it exactly as specified. Do not improvise a substitute.
- Perform every skill invocation the way it is requested (subagent, fork, or inline).

## Treat child skills as blackboxes

- Rely on the current skill for all high-level instructions. Everything else is handled by skills further down the call tree, or by parent skills.
- Do not read child skill content to interpret it. Invoke it only as a separate blackbox unit.
- When handing off info from one skill to another, do not analyze semantics. Output it as is.

## Keep moving

- Keep track of the current step.
- After finishing a step, proceed to the next one, unless stopped for user confirmation.
- Do not stop until the goal is complete or user input is required.
