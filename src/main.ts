import { createApp } from 'vue';
import App from './App.vue';
import router from './router';

import FloatingVue from 'floating-vue';
import 'floating-vue/dist/style.css';
import 'vue-color/style.css';

import { createVfm, useVfm } from 'vue-final-modal';
import 'vue-final-modal/style.css';

import VueAwesomePaginate from 'vue-awesome-paginate';
import 'vue-awesome-paginate/dist/style.css';

const app = createApp(App);

const vfm = createVfm();

app.use(router);
app.use(FloatingVue);
app.use(vfm);
app.use(VueAwesomePaginate);

app.directive('focus', {
  mounted(el, binding) {
    if (binding.value) {
      el.focus();
    }
  },
  updated(el, binding) {
    if (binding.value) {
      el.focus();
    }
  },
});

router.beforeEach(() => {
  useVfm().closeAll();
});

app.mount('#app');
