import { PageNotFound } from "doain/components";
import { setupLayouts } from "virtual:generated-layouts";
import generatedRoutes from "virtual:generated-pages";
import { createRouter, createWebHashHistory } from "vue-router";

const routes = setupLayouts(generatedRoutes);

routes.push({
  path: "/page-not-found",
  name: "PageNotFound",
  component: PageNotFound,
});

routes.push({
  path: "/:pathMatch(.*)*",
  redirect: "/page-not-found",
});

const router = createRouter({
  history: createWebHashHistory(),

  routes,
});

export default router;
