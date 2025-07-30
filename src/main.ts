import { createApp } from "vue";
import type { Plugin } from "vue";
import App from "./App.vue";
import router from "./router";
import defineValidationRules from './plugins/validation-rules';
import VModal from '@febe95/vue-js-modal'
import { V_MODAL_INJECTION_KEY } from '@/plugins/injects';

import VTooltip from "v-tooltip";
import VueClipboard from 'vue3-clipboard'
import WhatInput from "./plugins/WhatInput";

defineValidationRules();

const app = createApp(App);
app.use(router)
  .use(VModal as Plugin, { dynamic: true })

const modalInstance = app.config.globalProperties.$modal
app.provide(V_MODAL_INJECTION_KEY, modalInstance)
  .use(VTooltip)
  .use(VueClipboard, { autoSetContainer: true })
  .use(WhatInput)
  .mount("#app");
