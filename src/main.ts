/// <reference path="./../index.d.ts" />
import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import defineValidationRules from './plugins/validation-rules';

import 'vue-final-modal/style.css';

import { createVfm } from 'vue-final-modal'
import VTooltip from "v-tooltip";
import VueClipboard from 'vue3-clipboard'
import WhatInput from "./plugins/WhatInput";

defineValidationRules();

const app = createApp(App);
const vfm = createVfm();

app.use(router)
  .use(vfm)
  .use(VTooltip)
  .use(VueClipboard, { autoSetContainer: true })
  .use(WhatInput)
  .mount("#app");
