---
id: TASK-17
title: Convert App.vue and views to Composition API
status: In Progress
assignee:
  - Joshua Larks
created_date: '2026-04-07 23:57'
updated_date: '2026-04-10 19:56'
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

**vue-final-modal requirement (from TASK-14):** App.vue must import and render `<ModalsContainer />` from `\"vue-final-modal\"` as the last child inside its root element. This is required for the `useModal()` composable to work anywhere in the app. Also consider adding `vfm.closeAll()` in a router navigation guard (`router.beforeEach`) to dismiss any open modal when the user navigates to a new route.
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [ ] #1 App.vue uses script setup
- [ ] #2 All views use script setup
- [ ] #3 Site loads and navigates correctly end-to-end
- [ ] #4 No @Component decorator usage anywhere in src/
<!-- AC:END -->

## Implementation Plan

<!-- SECTION:PLAN:BEGIN -->
## Implementation Plan

### Section 1: Convert Home.vue (trivial)

- Replace `<script lang="ts">` with `<script setup lang="ts">`
- Remove `import { Component, Vue } from "vue-property-decorator"`
- Remove `@Component({ components: { HelloWorld } })` decorator — `HelloWorld` import auto-registers under `<script setup>`
- Remove `export default class Home extends Vue {}` wrapper
- Keep the `HelloWorld` import statement

Result: empty script setup with a single import.

---

### Section 2: Convert Documentation.vue

- Replace `<script lang="ts">` with `<script setup lang="ts">`
- Remove `import { Component, Prop, Vue } from "vue-property-decorator"` (note: `Prop` is imported but unused — drop it)
- Remove `@Component({ components: { ... } })` decorator — `CopyNotification` and `LeftNavigation` imports auto-register
- Keep `CopyNotification` and `LeftNavigation` import statements
- Convert `activeSection = "installation"` → `const activeSection = ref("installation")` with `import { ref } from "vue"`
- Convert `changeSection(activeSection: string)` method → `function changeSection(newSection: string) { activeSection.value = newSection }` (rename param to avoid shadowing the ref name)
- Template stays identical — `@update-section="changeSection"` and `:active-section="activeSection"` still work correctly

---

### Section 3: Convert App.vue + add ModalsContainer + router guard

This is the most involved file. Work in order:

**Script setup conversion:**
- Replace `<script lang="ts">` with `<script setup lang="ts">`
- Remove `import { Component, Vue } from "vue-property-decorator"`
- Remove `@Component({ components: { Toggle, Documentation } })` decorator — imports auto-register
- Keep `Toggle` and `Documentation` import statements
- Add `import { ModalsContainer } from "vue-final-modal"`
- Add `import { useVfm } from "vue-final-modal"` 
- Add `import { useRouter } from "vue-router"`
- Add `import { ref, computed } from "vue"`

**Data/computed conversion:**
- `appClass = "app-wrapper"` → `const appClass = "app-wrapper"` (plain const — never mutated, no reactivity needed)
- `nightClasses = ["night", "night-theme"]` → `const nightClasses = ["night", "night-theme"]` (plain const — same reason)
- `theme = "night"` → `const theme = ref("night")`
- `themes = { day: "Day", night: "Night" }` → `const themes = { day: "Day", night: "Night" }` (plain const)
- `get isNightTheme()` computed → `const isNightTheme = computed(() => theme.value === "night")`

**Toggle v-model binding fix:**
Toggle.vue was converted to use `value` prop and emits `input` event (Vue 2 convention). Vue 3 `v-model` maps to `:modelValue` + `@update:modelValue`, so `v-model="theme"` would silently not work. Fix in the template by using explicit bindings:
```html
<!-- Before -->
<toggle :values="themes" v-model="theme"></toggle>

<!-- After -->
<toggle :values="themes" :value="theme" @input="theme = $event"></toggle>
```
(Template auto-unwrapping means `theme = $event` correctly sets `theme.value` at runtime.)

**Add ModalsContainer to template:**
Per TASK-14 requirement, add as the last child inside the root `<div id="app">`:
```html
<div id="app" :class="[isNightTheme ? nightClasses : '', appClass]">
  <!-- existing content unchanged -->
  <ModalsContainer />
</div>
```

**Add router navigation guard to close modals on route change:**
After the import/const declarations in `<script setup>`:
```ts
const vfm = useVfm()
const router = useRouter()
router.beforeEach(() => { vfm.closeAll() })
```

---

### Verification Plan

**Build check:**
- Run `pnpm build` and confirm it exits with 0 TypeScript errors

**Grep checks (confirm no decorator usage remains in src/):**
- Grep `src/` for `@Component` — expect 0 hits in `<script>` blocks (template `<pre><code>` display content is fine)
- Grep `src/` for `vue-property-decorator` — expect 0 hits

**Manual verification:**
- Start dev server (`pnpm dev`) and open the app
- Confirm the app loads and the nav renders correctly
- Toggle between Day and Night theme — confirm the class changes (background, border colors update)
- Navigate between several demo sections using the left nav — confirm router-view updates and no console errors
- Open any modal (e.g., navigate to Modals demo, click a modal trigger button), then navigate away using the left nav — confirm the modal closes automatically (router guard)
- Confirm `<ModalsContainer />` renders without visible artifacts (it renders no visible DOM by default)
<!-- SECTION:PLAN:END -->

## Definition of Done
<!-- DOD:BEGIN -->
- [ ] #1 pnpm build runs without TypeScript errors
- [ ] #2 Code follows Vue 3 Composition API patterns (script setup, typed props/emits)
- [ ] #3 Manual verification completed per Verification Plan
<!-- DOD:END -->
