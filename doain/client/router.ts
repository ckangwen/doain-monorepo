import { setupLayouts } from "virtual:generated-layouts";
import generatedRoutes from "virtual:generated-pages";
import { createRouter, createWebHashHistory } from "vue-router";

import { DefaultLayout, NoneLayout, PageNotFound } from "../components/Layout";

const routes = setupLayouts(generatedRoutes).map((route) => {
  if (route.meta?.layout === "none") {
    route.component = NoneLayout;
  }
  if (!route.meta?.layout) {
    route.component = DefaultLayout;
  }

  return route;
});

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
