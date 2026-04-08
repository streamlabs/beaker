import { createRouter, createWebHistory } from "vue-router";
import demos from "./demos";

export default createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    ...demos.map(({ name, component }) => ({
      path: `/${name}`,
      name,
      component
    })),
    {
      path: "/:pathMatch(.*)*",
      redirect: "/installation"
    }
  ]
});
