const resolve = require("rollup-plugin-node-resolve");
const commonjs = require("rollup-plugin-commonjs");
const typescript = require("rollup-plugin-typescript");
const vue = require("rollup-plugin-vue");
const rebaseAssets = require("rollup-plugin-rebase");
const svg = require("rollup-plugin-svg");
// const minify = require("rollup-plugin-babel-minify");

import { terser } from "rollup-plugin-terser";

module.exports = {
  input: "src/system.js",
  output: [
    {
      file: "dist/beaker.common.js",
      format: "cjs"
    },
    {
      file: "dist/beaker.esm.js",
      format: "esm",
      exports: "named"
    }
  ],
  external: ["vue", "vue-router", "lodash"],
  plugins: [
    resolve(),
    commonjs({
      namedExports: {
        "node_modules/vue-color/dist/vue-color.min.js": ["Chrome"]
      }
    }),
    typescript(),
    vue({ defaultLang: { script: "ts", style: "less" } }),
    rebaseAssets(),
    svg(),
    terser()
  ]
};
