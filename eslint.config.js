const eslint = require("@eslint/js");
const eslintPluginVue = require("eslint-plugin-vue");
const globals = require("globals");
const typescriptEslint = require("typescript-eslint");

module.exports = typescriptEslint.config(
  { ignores: ["*.d.ts", "**/coverage", "**/dist"] },
  {
    extends: [
      eslint.configs.recommended,
      ...typescriptEslint.configs.recommended,
      ...eslintPluginVue.configs["flat/recommended"]
    ],
    files: ["**/*.{ts,vue}"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      globals: globals.browser,
      parserOptions: {
        parser: typescriptEslint.parser
      }
    },
    rules: {
      // your rules
    }
  },
  eslintConfigPrettier
);
