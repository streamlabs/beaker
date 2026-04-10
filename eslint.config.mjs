import pluginVue from 'eslint-plugin-vue'
import tseslint from 'typescript-eslint'
import vueParser from 'vue-eslint-parser'
import prettierConfig from 'eslint-config-prettier'

export default tseslint.config(
  // Vue 3 essential rules — sets vue-eslint-parser as the main parser for .vue files
  ...pluginVue.configs['flat/essential'],
  // TypeScript recommended rules — applies to all files, but overrides vue-eslint-parser
  // for .vue files (restored explicitly below)
  ...tseslint.configs.recommended,
  // Disable rules that conflict with Prettier
  prettierConfig,
  // Restore vue-eslint-parser as the main parser for .vue files, with typescript-eslint
  // as the sub-parser for <script lang="ts"> blocks
  {
    files: ['**/*.vue'],
    languageOptions: {
      parser: vueParser,
      parserOptions: {
        parser: tseslint.parser,
      },
    },
  },
  // Project-level rule overrides
  {
    rules: {
      'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
      'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
      // This is a component library — single-word names (Button, Badge, Toggle, etc.)
      // are the intentional public API. The multi-word rule does not apply here.
      'vue/multi-word-component-names': 'off',
    },
  },
)
