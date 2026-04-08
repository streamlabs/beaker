---
id: TASK-6
title: Update WhatInput plugin for Vue 3
status: Done
assignee: []
created_date: '2026-04-07 23:55'
updated_date: '2026-04-08 06:00'
labels: []
milestone: m-0
dependencies:
  - TASK-1
priority: medium
ordinal: 6000
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
Refactor `src/plugins/WhatInput/index.ts` to remove Vue 2's `Vue.prototype` augmentation.

**Change required:**
- Replace `Vue.prototype.$whatInput = whatInput` with `app.config.globalProperties.$whatInput = whatInput`
- Update the plugin's `install` function signature from `install(Vue: typeof _Vue)` to `install(app: App)`
- Update TypeScript augmentation if present

This is a small, isolated change but must be done before main.ts is updated.
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [ ] #1 Plugin uses app.config.globalProperties instead of Vue.prototype
- [ ] #2 install() function accepts App type
- [ ] #3 $whatInput accessible in components
<!-- AC:END -->

## Final Summary

<!-- SECTION:FINAL_SUMMARY:BEGIN -->
Folded into TASK-3. WhatInput plugin updated alongside main.ts rewrite since the two are tightly coupled.
<!-- SECTION:FINAL_SUMMARY:END -->
