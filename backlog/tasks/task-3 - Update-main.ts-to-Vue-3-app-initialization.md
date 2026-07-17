---
id: TASK-3
title: Update main.ts to Vue 3 app initialization
status: Done
assignee:
  - claude
created_date: '2026-04-07 23:54'
updated_date: '2026-04-08 05:59'
labels: []
milestone: m-0
dependencies:
  - TASK-1
  - TASK-2
priority: high
ordinal: 3000
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
Refactor `src/main.ts` from Vue 2 global API to Vue 3 `createApp` pattern.

**Changes required:**
- Replace `new Vue({ render: h => h(App) }).$mount('#app')` with `createApp(App).mount('#app')`
- Replace `Vue.use(VTooltip)` → `app.use(FloatingVue)` (after v-tooltip replacement)
- Replace `Vue.use(VueClipboard)` → remove entirely (replaced with browser API / @vueuse/core)
- Replace `Vue.use(WhatInput)` → `app.use(WhatInput)` after plugin is updated
- Remove `Vue.config.productionTip = false` (removed in Vue 3)
- Chain plugin registrations on the app instance before `.mount()`
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [x] #1 main.ts uses createApp()
- [x] #2 No Vue.use() calls remain
- [x] #3 No Vue.config.productionTip
- [ ] #4 App mounts correctly in dev
<!-- AC:END -->

## Implementation Plan

<!-- SECTION:PLAN:BEGIN -->
## Implementation Plan

### Key findings
- `vue-mq` was registered inside individual components (CallToAction.vue, ContentRow.vue, NewFeatureOverlay.vue) — antipattern. Breakpoints consistent across all three: `sm: 900, md: 1250, lg: Infinity`. Moving to main.ts.
- `v-tooltip.auto` directive in FormGroupH.vue and FormGroupV.vue — floating-vue keeps same directive name, no template changes needed now.
- `$whatInput` used in BannerMarketing.vue and TabsNew.vue — needs plugin updated first.
- `VueClipboard` — no components use `$copyText`, safe to remove entirely.
- TASK-6 (WhatInput plugin) folded into this task — it's a 4-line change main.ts directly depends on.

### Subtask 1 — Update src/plugins/WhatInput/index.ts
- `install(Vue: typeof _Vue)` → `install(app: App)` (import App from 'vue')
- `Vue.prototype.$whatInput` → `app.config.globalProperties.$whatInput`
- Update TypeScript module augmentation from `vue/types/vue` to `@vue/runtime-core`

### Subtask 2 — Rewrite src/main.ts
- Import createApp from 'vue'
- Import and register: FloatingVue + CSS, createVfm() + CSS, VueAwesomePaginate + CSS, Vue3Mq with breakpoints, WhatInput plugin
- Add app.use(router) (router object still exported same way before TASK-4)
- Register v-focus custom directive
- Remove Vue.config.productionTip, VueClipboard, all Vue.use() calls
- Mount with app.mount('#app')

### Notes
- Stray Vue.use(VueMq, ...) calls in CallToAction.vue, ContentRow.vue, NewFeatureOverlay.vue removed during TASK-11/15
- Marks TASK-6 as done
<!-- SECTION:PLAN:END -->

## Final Summary

<!-- SECTION:FINAL_SUMMARY:BEGIN -->
Both subtasks completed.

**Subtask 1 — WhatInput plugin (src/plugins/WhatInput/index.ts):**
- `install(Vue: typeof _Vue)` → `install(app: App)`
- `Vue.prototype.$whatInput` → `app.config.globalProperties.$whatInput`
- Module augmentation updated from `vue/types/vue` to `@vue/runtime-core` using `ComponentCustomProperties`

**Subtask 2 — main.ts rewrite:**
- `createApp(App)` pattern in place
- Registered: FloatingVue, vue-final-modal (createVfm), VueAwesomePaginate, Vue3Mq (breakpoints: sm:900, md:1250, lg:Infinity), WhatInput
- Registered v-focus custom directive
- Removed: Vue.config.productionTip, VueClipboard, all Vue.use() global calls

**AC #4 (app mounts correctly in dev)** deferred — app will not mount until router.ts (TASK-4) and components are updated. Marked as known blocker.

TASK-6 folded into this task and complete.
<!-- SECTION:FINAL_SUMMARY:END -->
