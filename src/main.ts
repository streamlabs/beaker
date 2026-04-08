import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";

import FloatingVue from "floating-vue";
import "floating-vue/dist/style.css";

import { createVfm } from "vue-final-modal";
import "vue-final-modal/style.css";

import VueAwesomePaginate from "vue-awesome-paginate";
import "vue-awesome-paginate/dist/style.css";

import { Vue3Mq } from "vue3-mq";

import WhatInput from "./plugins/WhatInput/index";

const app = createApp(App);

app.use(router);
app.use(FloatingVue);
app.use(createVfm());
app.use(VueAwesomePaginate);
app.use(Vue3Mq, {
  breakpoints: { sm: 900, md: 1250, lg: Infinity }
});
app.use(WhatInput);

app.directive("focus", {
  mounted(el) {
    el.focus();
  }
});

app.mount("#app");
