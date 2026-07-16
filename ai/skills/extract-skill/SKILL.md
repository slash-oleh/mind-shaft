---
name: extract-skill
description: Extract process knowledge from conversation actions and outcomes into a reusable skill. Use when asked to create a skill based on recently performed work.
---

# Extract Skill

## Goal

Summarize work done in the conversation actions and outcomes to extract reusable process knowledge as a skill. Abstract from data or other case-specific details and focus on algorithm.

## Prerequisites

- Access to recent conversation history and actions.

## Execution

### Step 1: Analyze actions and outcomes

Review the recent conversation history. Identify the sequence of actions, commands used, and tools applied that led to the successful outcome. Rely on the actual procedure that worked rather than reinventing the sequence.

### Step 2: Generalize and abstract

Abstract the extracted sequence from specific data or case-specific details. Focus on the algorithm and the general process.

### Step 3: Identify skill components

Identify the goal, execution steps, prerequisites, and activation conditions for the new skill based on the generalized process.

### Step 4: Create skill directory

Create a new directory for the skill.

### Step 5: Write SKILL.md

Write the `SKILL.md` file. Populate the frontmatter (name, description based on activation conditions), goal, prerequisites, and execution instructions. Do not reinvent tools or sequences - prefer what worked.

### Step 6: Formalize skill structure

Follow the corresponding skill structure pattern. Utilize available skill builder skills to format and formalize it.
