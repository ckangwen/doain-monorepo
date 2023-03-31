import type { RouteLocationNormalized, Router } from "vue-router";
import userDoainConfig from "~doain/config";

import { getToken, useUserStore } from "doain/core";

export const registerTokenGuard = (router: Router) => {
  if (userDoainConfig.router.enableTokenAuth !== true) {
    return;
  }
  const isUnloggedRoute = (route: RouteLocationNormalized) =>
    (userDoainConfig.router.unloggedOnlyRoutes || []).some((item: string) => {
      if (item.startsWith("/")) {
        return item === route.path;
      }
      return item === route.name;
    });
  const isUnimpededRoute = (route: RouteLocationNormalized) =>
    (userDoainConfig.router.unimpededRoutes || []).some((item: string) => {
      if (item.startsWith("/")) {
        return item === route.path;
      }
      return item === route.name;
    });

  router.beforeEach((to, from, next) => {
    if (userDoainConfig.router.enableTokenAuth !== true) {
      next();
      return;
    }
    const hasLogin = !!getToken();
    const isUnlogged = isUnloggedRoute(to);
    const isUnimpeded = isUnimpededRoute(to);
    if (isUnimpeded) {
      next();
      return;
    }
    // 如果是 仅未登录可访问的页面
    if (isUnlogged) {
      if (hasLogin) {
        next(userDoainConfig?.router?.homeRoute || "/");
      } else {
        next();
      }
      return;
    }
    // 是其他正常的页面，如果未登录，跳转到登录页面
    if (hasLogin) {
      next();
    } else {
      next(userDoainConfig?.router?.loginRoute || "/account/login");
    }
  });
};

export const registerUserGuard = (router: Router) => {
  router.beforeEach((to, from, next) => {
    const userStore = useUserStore();
    try {
      userStore.refreshUserInfo(false);
    } catch {
      //
    }

    next();
  });
};
