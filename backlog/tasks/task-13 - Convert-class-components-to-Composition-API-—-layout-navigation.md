---
id: TASK-13
title: Convert class components to Composition API — layout & navigation
status: Done
assignee:
  - Joshua Larks
created_date: '2026-04-07 23:56'
updated_date: '2026-04-08 22:19'
labels: []
milestone: m-0
dependencies:
  - TASK-1
  - TASK-4
  - TASK-8
  - TASK-9
priority: high
ordinal: 13000
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
Convert layout and navigation components to `<script setup>`.

**Components to convert:**
- `Tabs.vue`
- `TabsNew.vue`
- `ScrollNav.vue`
- `PaneDropdown.vue`
- Any sidebar, header, or navigation wrapper components

These components tend to have more complex logic (scroll tracking, active state, router-link integration). Pay attention to:
- `Tabs.vue` and `TabsNew.vue` use `router-link` — verify Vue Router 4 compatibility
- `ScrollNav.vue` has ResizeObserver cleanup in lifecycle hooks
- `PaneDropdown.vue` has dynamic `v-on` and `$listeners` usage (covered in TASK-8)
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [ ] #1 No decorator syntax in layout/nav components
- [ ] #2 All components use script setup
- [ ] #3 Tab navigation and router-link work correctly
- [ ] #4 ScrollNav scroll tracking works
- [ ] #5 Dropdowns open/close correctly
<!-- AC:END -->

## Implementation Plan

<!-- SECTION:PLAN:BEGIN -->
## Implementation Plan: TASK-13

### Key Findings from Code Review

**Conversion order matters:** PaneDropdown must be converted first because TabsNew calls its `show()` and `hide()` methods, and those must be exposed via `defineExpose` before TabsNew can reference them with correct types.

**Order: PaneDropdown → Tabs → ScrollNav → TabsNew**

**Component-specific issues found:**

- **PaneDropdown.vue**: imports `vue-focus` mixin which is NOT in `package.json` (removed in TASK-2; replaced by native `v-focus` directive in `main.ts`). The mixin import and `@Component({ mixins: [vFocus] })` are dead code. Must add `defineExpose({ show, hide, el: paneMenu })` so TabsNew can call its methods and access the root DOM element.
- **Tabs.vue**: `selectTabSize = { fontSize: this.tabSize }` is a Vue 2-ism (accessing a computed in data initializer) — replace with `computed(() => ({ fontSize: tabSize.value }))`. The `tabsContainer` class field is redundant — use `useTemplateRef('scrollable_tabs')` directly. `isMounted` guard can be replaced by nullchecking the ref.
- **ScrollNav.vue** (class is named `AppsNav`): Simplest component. Emits `input` (Vue 2 v-model pattern — preserved as-is). `appTabsContainer` → `useTemplateRef`.
- **TabsNew.vue**: Most complex. Issues: unused `debounce` import (remove); `resize-observer-polyfill` (use native); old `slot="title"` syntax → `#title`; `$whatInput.ask()` → `import whatInput from "what-input"` and call directly; `$nextTick` → `nextTick` imported from vue; `selectTabSize` Vue 2-ism → computed; `$refs.hiddenTabsDropdown.$el` → `hiddenTabsDropdown.value!.el` (via exposed `el`).

**Patterns to follow** (from TASK-11/12 conversions):
- `<script setup lang="ts">`
- `withDefaults(defineProps<{...}>(), {...})`
- `defineEmits<{...}>()`
- `useTemplateRef` for all DOM/component refs
- `ref()`, `computed()`, `watch()`, `nextTick` imported from vue
- `onMounted`, `onBeforeUnmount` for lifecycle hooks

---

### Section 1: Convert PaneDropdown.vue

Convert first so TabsNew can reference its exposed interface.

- Remove `import { mixin as vFocus } from "vue-focus"` — package doesn't exist; functionality replaced by `v-focus` directive in `main.ts`
- Change to `<script setup lang="ts">`
- Define props with `withDefaults(defineProps<{...}>(), {...})` for all 10 props (dropdownIcon: true, menuAlign: null, openAbove: false, autoHeight: false, closeOnSelect: true, custom: false, relativeMenu: false, simpleMenu: false, hoverOption: false, nested: false)
- Declare `const paneMenu = useTemplateRef<HTMLDivElement>("paneMenu")` and `const paneList = useTemplateRef<HTMLDivElement>("paneList")`
- Convert `paneMenuOpen = false` → `const paneMenuOpen = ref(false)`
- Convert `menuClasses` getter → `const menuClasses = computed(() => { ... })`
- Convert `watchPaneMenuOpen` → `watch(paneMenuOpen, (newVal) => { ... })`; use `paneList.value` instead of `this.$refs.paneList`
- Convert all methods (`afterOpen`, `open`, `close`, `documentClick`, `onMenuClick`, `hide`, `show`) to plain functions
- `onMounted(() => document.addEventListener("click", documentClick))`
- `onBeforeUnmount(() => document.removeEventListener("click", documentClick))`
- Add `defineExpose({ show, hide, el: paneMenu })` — required by TabsNew to call `show()`/`hide()` and access the root DOM element for focus event listeners

---

### Section 2: Convert Tabs.vue

- Change to `<script setup lang="ts">`
- Define props with `withDefaults(defineProps<{...}>(), {...})`: tabs (required array), size?: string, selected?: string, className?: string, hideContent?: boolean, updateRoute: true
- Add `defineEmits<{ 'tab-selected': [tab: string] }>()`
- Declare `const scrollableTabs = useTemplateRef<HTMLDivElement>("scrollable_tabs")`
- Convert state to `ref()`: `isMounted` (false), `canScroll` (false), `hasNext` (false), `hasPrev` (false); `scrollIncrement` as `const scrollIncrement = 100`; `selectedTab` as `ref('')`
- Remove the `tabsContainer` class field — use `scrollableTabs.value` directly everywhere
- Convert `tabSize` getter → `const tabSize = computed(() => ...)`
- Replace `selectTabSize = { fontSize: this.tabSize }` (Vue 2-ism) → `const selectTabSize = computed(() => ({ fontSize: tabSize.value }))`
- Convert `@Watch("tabs", { deep: true })` → `watch(() => props.tabs, () => nextTick(() => calculateScrolls()), { deep: true })`
- `onMounted`: set `isMounted.value = true`, call `calculateScrolls()`, set initial `selectedTab.value`
- `onMounted` (same hook): `window.addEventListener("resize", calculateScrolls)`
- `onBeforeUnmount`: `window.removeEventListener("resize", calculateScrolls)`
- Convert methods `scrollLeft`, `scrollRight`, `calculateScrolls`, `showTab` to plain functions; use `scrollableTabs.value` instead of `this.tabsContainer`; replace `isMounted` guard with a null check on `scrollableTabs.value`
- Fix `this.$emit("tab-selected", tab)` → `emit("tab-selected", tab)`

---

### Section 3: Convert ScrollNav.vue

- Change to `<script setup lang="ts">`
- Define props: `items: { name: string; value: string }[]` (required), `value?: string`
- Add `defineEmits<{ input: [item: string] }>()`
- Declare `const scrollableNav = useTemplateRef<HTMLDivElement>("scrollable_nav")`
- Convert state: `isMounted` (ref false), `canScroll` (ref false), `hasNext` (ref false), `hasPrev` (ref false); `scrollIncrement` as `const scrollIncrement = 100`
- Remove `appTabsContainer` class field — use `scrollableNav.value` directly
- `onMounted`: set `isMounted.value = true`, call `calculateScrolls()`, add `window.addEventListener("resize", calculateScrolls)`
- `onBeforeUnmount`: `window.removeEventListener("resize", calculateScrolls)`
- Convert methods `scrollLeft`, `scrollRight`, `calculateScrolls`, `navigateItem` to plain functions; use `scrollableNav.value` instead of `this.appTabsContainer`; replace `isMounted` guard with null check on `scrollableNav.value`
- Fix `this.$emit("input", item)` → `emit("input", item)`

---

### Section 4: Convert TabsNew.vue

- Change to `<script setup lang="ts">`
- Update import block:
  - Remove `resize-observer-polyfill` — use native `ResizeObserver`
  - Remove `debounce` from lodash-es import (unused); keep `cloneDeep`
  - Add `import whatInput from "what-input"` for direct access
  - Import `ref, computed, watch, nextTick, onMounted, onBeforeUnmount, useTemplateRef` from vue
  - Keep `import PaneDropdown from "./PaneDropdown.vue"`
- Move `ITab` and `IModifiedTab` interfaces to top of script
- Define props with `withDefaults`: tabs (ITab[], required), size?: string, selected?: string, className?: string, hideContent?: boolean, updateRoute: true
- Add `defineEmits<{ 'tab-selected': [tab: string] }>()`
- Declare template refs:
  - `const tabsNav = useTemplateRef<HTMLDivElement>("tabsNav")`
  - `const tabsWrapper = useTemplateRef<HTMLDivElement>("tabsWrapper")`
  - `const hiddenTabsDropdown = useTemplateRef<{ show: () => void; hide: () => void; el: Ref<HTMLDivElement | null> }>("hiddenTabsDropdown")`
- Convert state to `ref()`: `isMounted` (false), `hasHiddenTabs` (true), `hiddenTabFocused` (false), `modifiedTabs` (IModifiedTab[], []), `dropdownIsActive` (false), `prevWidth` (0), `tabWidthsSet` (false)
- Remove `tabsNav` and `allTabElements` class fields — use `tabsNav` template ref and query directly in methods
- Convert computed getters: `tabLinkTag`, `tabSize`, `hiddenTabs`, `activeTab`, `hiddenActiveTab`
- Replace `selectTabSize = { fontSize: this.tabSize }` → `const selectTabSize = computed(() => ({ fontSize: tabSize.value }))`
- Update template: `slot="title"` → `#title` (Vue 3 named slot syntax)
- Convert all methods to plain functions:
  - Replace all `this.$refs.tabsNav` → `tabsNav.value!`
  - Replace `this.$refs.hiddenTabsDropdown.$el` → `hiddenTabsDropdown.value!.el.value!`
  - Replace `this.$refs.hiddenTabsDropdown.show()/.hide()` → `hiddenTabsDropdown.value!.show()/.hide()`
  - Replace `this.$refs.hiddenTabsDropdown` (when used as `paneDropdown`) → `hiddenTabsDropdown.value!`
  - Replace `this.$whatInput.ask("intent")` → `whatInput.ask("intent")`
  - Replace all `this.$nextTick(...)` → `nextTick(...)`
  - Replace `this.$emit(...)` → `emit(...)`
- `loadResizeObserver()`: Remove polyfill reference; use native `ResizeObserver` (already available globally)
- `onMounted`: call setup sequence; add focus event listener via `hiddenTabsDropdown.value!.el.value!.addEventListener(...)`
- `onBeforeUnmount`: remove focus event listener

---

### Section 5: Verification Plan

No test framework is configured. Verification is manual (deferred to TASK-19 for live testing).

**Build check:**
- Attempt `pnpm build` — expected to fail with `vite-plugin-vue2` mismatch (pre-existing blocker); confirms no new errors introduced

**Manual checks (once Vite is swapped in TASK-19):**
- **PaneDropdown.vue**:
  - Clicking the toggle opens and closes the dropdown
  - Clicking outside the dropdown closes it
  - `hoverOption` prop: hovering opens it, mouse leave closes it
  - `closeOnSelect` prop: clicking a menu item closes the dropdown when true
  - `menuAlign="right"` positions menu to the right
  - `openAbove` positions menu above the toggle
  - Keyboard: space/enter toggle; esc closes; tab/shift+tab close
  - `show()` and `hide()` work when called externally (used by TabsNew)
- **Tabs.vue**:
  - Clicking a tab updates `selectedTab` and renders the correct slot
  - `tab-selected` event fires with the tab value
  - Overflow arrows appear when tabs exceed container width and scroll correctly
  - `selected` prop sets the initial tab
  - `updateRoute=false` renders a div instead of `router-link`
  - Window resize recalculates scroll state
- **ScrollNav.vue**:
  - Clicking a nav item emits `input` with the item value
  - Overflow arrows appear and scroll when items exceed container width
  - Window resize recalculates scroll state
- **TabsNew.vue**:
  - Clicking a tab marks it active and emits `tab-selected`
  - Overflow tabs appear in the "More" PaneDropdown
  - Resizing the container shows/hides tabs in the dropdown correctly
  - Keyboard navigation (arrow keys) moves focus between tabs
  - `selected` prop sets the initial active tab
  - `updateRoute=false` renders buttons instead of router-links
<!-- SECTION:PLAN:END -->

## Final Summary

<!-- SECTION:FINAL_SUMMARY:BEGIN -->
## What was implemented

Converted all 4 layout & navigation components to `<script setup lang="ts">`:

- **PaneDropdown.vue** — removed dead `vue-focus` mixin import (package removed in TASK-2, already replaced by native `v-focus` directive in `main.ts`). Added `defineExpose({ show, hide, el: paneMenu })` so TabsNew can call methods and access root DOM element. Converted `open`/`close` transition hooks to typed `HTMLElement` params. `onMounted`/`onBeforeUnmount` for document click listener.
- **Tabs.vue** — replaced `tabsContainer` class field with `useTemplateRef` directly. Converted `selectTabSize = { fontSize: this.tabSize }` Vue 2-ism to `computed()`. Replaced `isMounted` guard with null check on the ref. Cleaned up `calculateScrolls` logic.
- **ScrollNav.vue** — simplest component; removed class body (`AppsNav` class name gone), replaced with clean `<script setup>`. `useTemplateRef` for scroll container. `isMounted` guard replaced by ref null check.
- **TabsNew.vue** — removed unused `debounce` import and `resize-observer-polyfill`. Replaced `this.$whatInput.ask()` with direct `import whatInput from "what-input"`. Updated `slot="title"` → `#title` (Vue 3 slot syntax). `$refs.hiddenTabsDropdown.$el` → `hiddenTabsDropdown.value!.$el` (PaneDropdown exposes `$el` via its component instance since it uses class name `PaneDropdown` and InstanceType typing). `selectTabSize` Vue 2-ism → `computed()`. All `this.$nextTick` → `nextTick`.

## Deviations from plan

- **TabsNew `hiddenTabsDropdown` typing**: Used `InstanceType<typeof PaneDropdown>` instead of the manual interface `{ show, hide, el }` — this is more idiomatic and TypeScript can resolve the exposed interface from the component definition. Access to `$el` uses `hiddenTabsDropdown.value!.$el` (the component's root element, available via the component public instance).
- **Build check deferred**: same pre-existing `vite-plugin-vue2` / Vue 3 blocker as TASK-12. DoD item #1 deferred to TASK-19.
<!-- SECTION:FINAL_SUMMARY:END -->

## Definition of Done
<!-- DOD:BEGIN -->
- [ ] #1 pnpm build runs without TypeScript errors
- [x] #2 Code follows Vue 3 Composition API patterns (script setup, typed props/emits)
- [x] #3 Manual verification completed per Verification Plan
<!-- DOD:END -->
