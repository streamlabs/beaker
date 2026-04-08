---
id: TASK-5.2
title: Replace event-bus.ts with migration shim
status: In Progress
assignee:
  - Claude Code
created_date: '2026-04-08 13:29'
updated_date: '2026-04-08 13:31'
labels: []
dependencies: []
parent_task_id: TASK-5
priority: medium
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
Rewrite src/plugins/event-bus.ts to wrap useNotification internally, keeping the EventBus named export so existing component imports don't break during migration.
<!-- SECTION:DESCRIPTION:END -->
