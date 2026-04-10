---
id: TASK-16.2
title: Convert Tabs.vue with dynamic slot v-for pattern
status: To Do
assignee:
  - Claude Code
created_date: '2026-04-10 16:42'
labels: []
dependencies: []
parent_task_id: TASK-16
priority: medium
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
Convert Tabs.vue demo from class component to script setup. Key change: :slot="tab.value" in v-for → <template v-for="tab in tabs" #[tab.value] :key="tab.value">. Apply to both Tabs and TabsNew demo sections.
<!-- SECTION:DESCRIPTION:END -->
