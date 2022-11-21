/// <reference path="./../index.d.ts" />
import Vue from "vue";
import App from "./App.vue";
import router from "./router";

import VTooltip from "v-tooltip";
import VueClipboard from "vue-clipboard2";
import WhatInput from "./plugins/WhatInput/index";

Vue.config.productionTip = false;

Vue.use(VTooltip);
Vue.use(VueClipboard);
Vue.use(WhatInput);

new Vue({
  el: '#app',
  router,
  render: h => h(App)
}).$mount("#app");
