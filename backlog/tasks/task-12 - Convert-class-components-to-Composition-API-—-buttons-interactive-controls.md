---
id: TASK-12
title: Convert class components to Composition API — buttons & interactive controls
status: To Do
assignee: []
created_date: '2026-04-07 23:56'
labels: []
milestone: m-0
dependencies:
  - TASK-1
  - TASK-5
  - TASK-8
  - TASK-9
priority: high
ordinal: 12000
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
Convert button and interactive control components to `<script setup>`.

**Components to convert:**
- `Button.vue`
- `IconButton.vue` (if exists)
- `Slider.vue`
- `SliderTwo.vue`
- `CopyNotification.vue`
- Any other standalone interactive/action components

Follow the same `@Prop` → `defineProps`, `@Watch` → `watch()` pattern from TASK-11.

Note: `Slider.vue` and `SliderTwo.vue` also have lifecycle hook renames (covered in TASK-9) and `$listeners` changes (TASK-8) — ensure those are resolved first or handle together.
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [ ] #1 No decorator syntax in any button or control component
- [ ] #2 All components use script setup
- [ ] #3 Slider interaction and events work correctly
- [ ] #4 CopyNotification copy events work with mitt
<!-- AC:END -->
