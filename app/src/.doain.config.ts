import { httpClient } from "doain/core";
import { defineClientConfig } from "doain/config";

import type { RawUserInfo } from "./types";

const APP_KEY = "playground";
const LOGIN_URL = "login";
const USER_INFO_URL = "user/info";
const LOGIN_ROUTE = "/account/login";

export default defineClientConfig({
  app: {
    appKey: APP_KEY,
  },
  layout: {
    title: "Doain",
    data: [
      {
        path: "/account/user-info",
        title: "UserInfo",
      },
      {
        title: "Demo01",
        path: "/demo/demo01",
      },
      {
        title: "Demo02",
        path: "/demo/demo02",
      },
      {
        title: "Demo03",
        path: "/demo/user",
      },
    ],
    transitionName: "doain-zoom-fade",
    activeMenuRules: {
      "/demo/user/(.*)": "/demo/user",
    }
  },
  component: {
    upload: {
      url: "http://localhost:8010/mock-api/tool/upimg",
      transformImageUrl(data: Record<string, any>) {
        return data.url;
      },
    },
    paginationView: {
      formProps: {
        labelWidth: "100px",
        labelPosition: "left",
      },
      tableProps: {
        headerCellClassName: "global-header-cell-class",
      },
      paginationProps: {
        background: true,
        layout: "total, sizes, prev, pager, next, jumper",
        pageSizes: [10, 20, 30, 40, 50, 100],
      },
    },
  },
  store: {
    formatUserData(data) {
      const { userId, username, avatar } = data as RawUserInfo;
      return {
        username,
        userId,
        avatar,
      };
    },
  },
  fetch: {
    baseUrl: "http://localhost:8010/mock-api/",
    tokenWhiteList: [LOGIN_URL],
    fetchUserInfo() {
      return httpClient.limitRepeatedRequest({
        url: USER_INFO_URL,
      });
    },
    login() {
      return httpClient.limitRepeatedRequest({
        url: LOGIN_URL,
      });
    },
    getTokenAfterLogin(data) {
      return data.token;
    },
  },
  router: {
    loginRoute: LOGIN_ROUTE,
    homeRoute: "/",
    enableTokenAuth: true,
    unimpededRoutes: [],
    unloggedOnlyRoutes: [LOGIN_ROUTE],
  },
})
