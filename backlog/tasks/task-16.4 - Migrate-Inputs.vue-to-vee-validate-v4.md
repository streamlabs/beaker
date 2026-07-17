---
id: TASK-16.4
title: Migrate Inputs.vue to vee-validate v4
status: Done
assignee:
  - Claude Code
created_date: '2026-04-10 16:42'
updated_date: '2026-04-10 17:57'
labels: []
dependencies: []
parent_task_id: TASK-16
priority: medium
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
Convert Inputs.vue to script setup. Replace v-validate directive + errors.first() with useField() from useValidation.ts composable. Fix all slot="input" → #input template syntax.
<!-- SECTION:DESCRIPTION:END -->
