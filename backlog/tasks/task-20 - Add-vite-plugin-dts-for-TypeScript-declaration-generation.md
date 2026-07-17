---
id: TASK-20
title: Add vite-plugin-dts for TypeScript declaration generation
status: To Do
assignee: []
created_date: '2026-04-07 23:57'
labels: []
milestone: m-0
dependencies:
  - TASK-19
priority: medium
ordinal: 20000
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
Replace the hand-maintained `index.d.ts` with auto-generated TypeScript declarations using `vite-plugin-dts`.

**Install:** `vite-plugin-dts`

**Update `vite-publish.config.js`:**
```ts
import dts from 'vite-plugin-dts'

export default defineConfig({
  plugins: [
    vue(),
    dts({ insertTypesEntry: true })
  ],
  ...
})
```

**After setup:**
- Verify `.d.ts` files are generated in `dist/` on `pnpm build:publish`
- Check that `package.json` `"types"` field points to the correct generated file
- Remove or archive the hand-written `index.d.ts` once generated types are verified to be accurate

This task depends on Vite 8 being in place (TASK-19) and TypeScript being fully set up across all components.
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [ ] #1 vite-plugin-dts installed and configured
- [ ] #2 pnpm build:publish generates .d.ts files in dist/
- [ ] #3 package.json types field is accurate
- [ ] #4 Consumers of the library get type hints for all exported components
<!-- AC:END -->
