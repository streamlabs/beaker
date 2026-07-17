---
id: TASK-16.5
title: 'Update modal demos to v-model API (Modals, Prime, Announcements)'
status: Done
assignee:
  - Claude Code
created_date: '2026-04-10 16:42'
updated_date: '2026-04-10 19:44'
labels: []
dependencies: []
parent_task_id: TASK-16
priority: medium
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
Convert Modals.vue, Prime.vue, Announcements.vue to script setup. Replace $modal.show('name') with ref<boolean> state variables and v-model on ModalComp/NewFeatureOverlay. Remove name prop from ModalComp.
<!-- SECTION:DESCRIPTION:END -->
