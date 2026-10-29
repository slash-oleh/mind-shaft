---
title: SKILL.md
name: declarative-skill
description: Create a declarative skill - a set of standing rules and mindset for a domain, instead of a step-by-step workflow. Use when knowledge is guidelines to follow while doing varied work (writing, debugging, reviewing, tickets, VCS), not a fixed sequence to execute.
claudecode:
  argument-hint: '[skill_name] [description]'
  arguments:
    - 'skill_name'
    - 'description'
---

# Declarative Skill

## When to apply

- Content is "how to behave" in a domain, not "what to run in order".
- Same guidance applies across many tasks and workflows, which load it as context.
- Procedural skills would otherwise repeat the same rules inline.

If the knowledge is an ordered procedure with inputs and outputs, write a regular workflow skill instead.

## Structure

- One `SKILL.md`. No scripts, no templates.
- Frontmatter: `title: SKILL.md`, `name`, `description`.
- `description`: first sentence names the domain or mindset. Second starts with "Use when" and lists the situations (e.g. "drafting ticket or PR descriptions", "anything is broken").
- Body: `# <Name>`, then bullets. Optional second-level sections for situational subsets (e.g. `Creating`, `Fixing`, `Reviewing`, `Submitting`).
- Name by domain noun (`writing`, `detective`, `vcs`), not by verb phrase.

## Writing rules

- Bullet form: `- **Short imperative**: rule, reason or detail.` Bold lead makes it scannable. Plain bullets are fine for terse rules.
- One rule per bullet. State what to do, not background.
- Keep rules actionable and checkable. Prefer measurable ("over 300 added lines") over vague ("large").
- Split by situation, not by tool. Give each section a trigger: when does it apply.
- Use numbered steps (`### Step N`) only inside a section that has a real sequence, such as a review pass.
- Use a fixed list of fields (e.g. Title, Pre-conditions, STR/AR/ER) when the skill governs the shape of an artifact.
- Give defaults with fallbacks ("check the project's documented convention, fall back to X").
- Mark user-gated actions explicitly ("ask before force-push").
- Cross-reference adjacent domains in an `## Adjacent domains` section: one bullet per situation this skill touches but does not govern (e.g. drafting PR text), each saying to load the skill for that domain. Describe the domain, never the skill name, so skills stay easy to rename and replace. Agents tend to skip a second skill once one is active, so the section must state that this skill does not replace it.
- Concise, no fluff, no emojis, ASCII only.

## Execution

1. Collect the rules: from the conversation, existing procedural skills, or the user's notes.
2. Pick the domain and name. Check existing declarative skills to extend one instead of adding a new one.
3. Strip case-specific data (ticket IDs, repo names, commands tied to one tool). Keep the principle.
4. Group rules into the base list plus situational sections.
5. Write `SKILL.md` per the structure above.
6. Check isolation: no references into other skills' internals or names. Refer to sibling skills by domain only.

## Anti-patterns

- Procedure disguised as rules: numbered steps with inputs and outputs belong in a workflow skill.
- Giant catch-all skill: split by domain.
- Restating generic model behavior: include only what the project wants enforced.
- Duplicating a rule across declarative skills: keep it in one place.
