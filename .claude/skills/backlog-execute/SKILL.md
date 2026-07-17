---
description: Execute an implementation plan for a backlog task
---

## BACKLOG EXECUTE WORKFLOW

Use your backlog MCP tool to look at the specified backlog task: **$ARGUMENTS**

---

### Git Commit Format

All commits during task execution MUST follow this format:

**Subject line:** `backlog(<task-id>): <Task Title> - <action>`

**Actions:**

- `moved to In Progress` - when a task/subtask status changes to In Progress
- `completed` - when a subtask is marked Done
- `marked Done` - when the parent task is marked Done

**Commit body (conditional):**

- If **3 or fewer files** were changed: Use subject line only (no body)
- If **more than 3 files** were changed: Include a body listing the files

**Example (small change):**

```
backlog(task-173.01): Phase 1 Archive desktop-host - completed
```

**Example (larger change):**

```
backlog(task-173.01): Phase 1 Archive desktop-host - completed

Files changed:
- src/components/CampaignCard.vue (created)
- src/stores/campaigns.ts (modified)
- src/types/campaign.ts (created)
```

---

### Execution Steps

#### 1. Set Parent Task to In Progress and Commit

1. Change the parent task status to "In Progress"
2. Stage all changes and commit with format: `backlog(<parent-task-id>): <Parent Task Title> - moved to In Progress`

#### 2. Review the Implementation Plan

Read the task's implementation plan carefully. If no implementation plan exists, stop and inform the user that they should run `/backlog-plan <task-id>` first.

#### 3. Create Subtasks

Unless the description of the parent task specifically forbids subtasks:

- Check if any subtasks already exist. If so, delete them all and start fresh.
- Create subtasks aligned with every section in the implementation plan (attach each to the parent task ID)
- Give each subtask status "To Do", add parent task ID, assign to "Claude Code", and give the same priority as the parent task

#### 4. Execute Work Sequentially

For each subtask (or implementation plan section if no subtasks):

1. **Set to In Progress and Commit**
    - Mark the current subtask as "In Progress"
    - Stage all changes and commit: `backlog(<subtask-id>): <Subtask Title> - moved to In Progress`

2. **Perform the Work** - Complete all action items in the section:
    - Follow the coding standards in CLAUDE.md
    - For Vue 3 components: use `<script setup lang="ts">`, typed props/emits
    - Match patterns from existing similar code in the codebase

3. **Verify Section Complete** - Ensure all bulleted items are done

4. **Mark as Done and Commit**
    - Set the subtask status to "Done"
    - Stage all changes
    - If 3 or fewer files changed: commit with subject only
    - If more than 3 files changed: commit with body listing the files
    - Format: `backlog(<subtask-id>): <Subtask Title> - completed`

5. **Move to Next** - Find and begin the next subtask

#### 5. Run Verification Plan

1. Run any Vue/Vitest unit tests specified in the plan
2. Perform manual verification checks listed in the plan
3. Document any issues found and fix them
4. **Check Definition of Done**:
    - Review all Definition of Done items on the parent task
    - Verify each item is satisfied
    - Check off each item using `definitionOfDoneCheck`
    - **CRITICAL: Do NOT modify or remove any Definition of Done items** - only check them off

#### 6. Complete Parent Task and Final Commit

Once all subtasks are complete and verification passes:

1. Mark the parent task status as "Done"
2. Add a final summary to the task's implementation notes describing:
    - What was implemented
    - Any deviations from the original plan
    - Any follow-up items identified
3. Stage all changes and create final commit:
    - If 3 or fewer files changed: subject only
    - If more than 3 files changed: include body with file list
    - Format: `backlog(<parent-task-id>): <Parent Task Title> - marked Done`

#### 7. Report Completion

Provide a summary to the user of:

- What was completed
- Tests that were run
- Any issues encountered and how they were resolved
