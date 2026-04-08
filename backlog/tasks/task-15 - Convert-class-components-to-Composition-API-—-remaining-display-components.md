---
id: TASK-15
title: Convert class components to Composition API — remaining display components
status: To Do
assignee: []
created_date: '2026-04-07 23:56'
labels: []
milestone: m-0
dependencies:
  - TASK-1
  - TASK-8
  - TASK-9
priority: medium
ordinal: 15000
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
Convert all remaining library components not covered in TASK-11 through TASK-14 to `<script setup>`.

This is a catch-all for any display, data, or utility components. Before starting, run a search for any remaining `@Component` decorator usage to get the definitive list.

**Likely includes:**
- `SSProSimulator.vue`
- Any chart, badge, tag, alert, or notification components
- Any icon wrapper components
- Any remaining components in `src/components/` not covered by prior tasks

Verify the complete list by searching for remaining `@Component` imports after TASK-11–14 are done.
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [ ] #1 Zero @Component decorator usage remains in src/components/
- [ ] #2 All components use script setup
- [ ] #3 No vue-class-component or vue-property-decorator imports remain
<!-- AC:END -->
