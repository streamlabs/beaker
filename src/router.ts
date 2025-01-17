import { createRouter, createWebHistory } from 'vue-router';
import demos from "./demos";

const routes = [
  ...demos.map(({ name, component }) => {
    return {
      path: `/${name}`,
      name,
      component
    };
  }),
  {
    path: '/',
    redirect: "/installation"
  }
];

export default createRouter({
  history: createWebHistory(),
  routes,
})