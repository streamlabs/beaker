---
id: TASK-14
title: Convert class components to Composition API — modals
status: To Do
assignee: []
created_date: '2026-04-07 23:56'
labels: []
milestone: m-0
dependencies:
  - TASK-1
  - TASK-2
  - TASK-8
priority: high
ordinal: 14000
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
Convert modal components to `<script setup>`. These also depend on the vue-js-modal replacement (TASK-2).

**Components to convert:**
- `ModalBasic.vue`
- `ModalConfirmation.vue`
- `ModalRedirect.vue`

All three use `v-on="$listeners"` (covered in TASK-8). Depending on which modal library replaces `vue-js-modal`, the internal API for showing/hiding may change significantly — coordinate with TASK-2.
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [ ] #1 No decorator syntax in modal components
- [ ] #2 All modal components use script setup
- [ ] #3 Modals open and close correctly with the new modal library
- [ ] #4 Event forwarding works via $attrs
<!-- AC:END -->
