/// <reference path="./../index.d.ts" />
import Vue from "vue";
import App from "./App.vue";
import router from "./router";

import VModal from "vue-js-modal";
import { V_MODAL_INJECTION_KEY } from "./plugins/injects";
import VTooltip from "v-tooltip";
import VueClipboard from "vue-clipboard2";
import WhatInput from "./plugins/WhatInput/index";

Vue.config.productionTip = false;

Vue.use(VModal);
Vue.use(VTooltip);
Vue.use(VueClipboard);
Vue.use(WhatInput);

new Vue({
  el: "#app",
  router,
  render: (h) => h(App),
  provide() {
    return {
      [V_MODAL_INJECTION_KEY]: this.$modal,
    };
  },
}).$mount("#app");
