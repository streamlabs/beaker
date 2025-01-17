/// <reference path="./../index.d.ts" />
import { createApp, configureCompat } from "@vue/compat";
import App from "./App.vue";
import router from "./router";
import defineValidationRules from './plugins/validation-rules';

import 'vue-final-modal/style.css';


configureCompat({
  MODE: 3,
  RENDER_FUNCTION: false
})

defineValidationRules();

import { createVfm } from 'vue-final-modal'

// import {
  //   V_WHAT_INPUT_INJECTION_KEY,
  //   VEE_VALIDATE_INJECTION_KEY,
  // } from "./plugins/injects";
import VTooltip from "v-tooltip";
import VueClipboard from 'vue3-clipboard'

import WhatInput from "./plugins/WhatInput";
// import VueMq from "vue-mq";

const app = createApp(App);
const vfm = createVfm();

app.use(router)
  .use(vfm)
  .use(VTooltip)
  .use(VueClipboard, { autoSetContainer: true })
  .use(WhatInput)
  .mount("#app");
// .use(VueMq, {
//   breakpoints: {
//     // default breakpoints - customize this
//     sm: 900,
//     md: 1250,
//     lg: Infinity,
//   },
//   defaultBreakpoint: "sm", // customize this for SSR
// })
