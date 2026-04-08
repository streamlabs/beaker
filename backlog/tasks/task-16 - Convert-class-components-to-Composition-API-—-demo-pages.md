---
id: TASK-16
title: Convert class components to Composition API — demo pages
status: To Do
assignee: []
created_date: '2026-04-07 23:57'
updated_date: '2026-04-08 20:28'
labels: []
milestone: m-0
dependencies:
  - TASK-1
  - TASK-5
  - TASK-7
priority: medium
ordinal: 16000
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
Convert all demo pages in `src/demos/` to `<script setup>`.

Demo pages are not part of the published library — they only power the docs site. They tend to be simpler (mostly prop bindings and event handlers) so this should be faster than library component conversion.

**Known files with specific changes:**
- `src/demos/Inputs.vue` — uses vee-validate (covered in TASK-7), EventBus (covered in TASK-5)
- `src/demos/Colors.vue` — uses EventBus
- `src/demos/Icons.vue` — uses EventBus
- `src/demos/Buttons.vue` — uses EventBus

Verify the full list by checking all `.vue` files in `src/demos/`.
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [ ] #1 No @Component decorator usage remains in src/demos/
- [ ] #2 All demo pages render correctly in the dev site
- [ ] #3 Demo pages using EventBus (Colors.vue, Icons.vue, Buttons.vue, Inputs.vue) updated to use useNotification() composable
<!-- AC:END -->
