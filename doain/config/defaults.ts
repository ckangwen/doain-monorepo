import type { DoainClientConfig } from "./types";

export const defaultDoainClientConfig: DoainClientConfig = {
  app: {
    appKey: "",
    storageKey: "",
  },
  layout: {
    logo: "",
    title: "",
    collapse: false,
    layout: "mix",
    sidebarWidth: [54, 200],
    tabViewStorageName: "tabView",
    ignoreNavigationTabKey: "navigationTab",
    data: [],
    enableNavigationTab: false,
  },
  store: {
    formatUserData() {
      return {
        username: "",
        userId: 0,
      };
    },
  },
  fetch: {
    baseUrl: "",
    async fetchUserInfo() {
      return {} as any;
    },
    async login() {
      return {} as any;
    },
    getTokenAfterLogin() {
      return "";
    },
  },
  router: {
    enableTokenAuth: false,
    homeRoute: "/",
    loginRoute: "/account/login",
    unloggedOnlyRoutes: ["/account/login"],
  },
};
