---
id: TASK-17
title: Convert App.vue and views to Composition API
status: To Do
assignee: []
created_date: '2026-04-07 23:57'
labels: []
milestone: m-0
dependencies:
  - TASK-3
  - TASK-4
  - TASK-11
  - TASK-12
  - TASK-13
  - TASK-14
  - TASK-15
  - TASK-16
priority: medium
ordinal: 17000
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
Convert the root app component and all view-level components in `src/views/` to `<script setup>`.

**Files:**
- `src/App.vue` — root component, likely wires up router-view and global layout
- All `.vue` files in `src/views/`

These should be converted last as they depend on all child components being stable first.
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [ ] #1 App.vue uses script setup
- [ ] #2 All views use script setup
- [ ] #3 Site loads and navigates correctly end-to-end
- [ ] #4 No @Component decorator usage anywhere in src/
<!-- AC:END -->
