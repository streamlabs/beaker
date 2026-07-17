---
description: Create an implementation plan for a backlog task
---

## BACKLOG PLAN WORKFLOW

Use your backlog MCP tool to look at the specified backlog task: **$ARGUMENTS**

**Rules:**
- You are NOT allowed to touch the description or implementation notes fields, only view
- You are NOT to edit any code during the creation of this implementation plan

**Steps:**

### 1. Set Task Status
Set the task status to "In Progress" and assign to "Joshua Larks".

### 2. Research and Analyze
Look at all relevant information on the task. Examine similar files to ones you plan to create and review the code of files you plan to update. Ensure your implementation plan contains instructions on keeping code adherent to the same standards and procedures as existing code.

### 3. Create Implementation Plan
Create an implementation plan with:
- Sections with clear, understandable titles in order the work is to be performed
- No section should be a "pure research" task - sections can contain research steps but all need actual implementation
- Each section must have bulleted lists of every action needed
- The last section should be a **"Verification Plan"** including:
  - Vue/Vitest unit tests to write for new components, composables, or utilities
  - Manual verification checks - if you wrote any UI code, list steps to manually test the feature

### 4. Save the Plan
Add the implementation plan to the task's "implementation plan" field using the backlog MCP tool.

### 5. Set Definition of Done
Add the following Definition of Done items to the task using `definitionOfDoneAdd`:
1. `pnpm build runs without TypeScript errors`
2. `Code follows Vue 3 Composition API patterns (script setup, typed props/emits)`
3. `Manual verification completed per Verification Plan`

**CRITICAL: These Definition of Done items are IMMUTABLE.**
- Do NOT modify, remove, or uncheck these items during task execution
- Do NOT use `definitionOfDoneRemove` or `definitionOfDoneUncheck` on these items
- The Definition of Done serves as the final quality gate before a task can be marked complete
- All items must be checked off during the Verification Plan phase of execution

### 6. Finalize
- Leave the task in "In Progress" status
- Provide a summary of the plan you created and ask the user for approval before any code is written
