import { CharrueLayout } from "@charrue/layout-next";
import type { FormProps, PaginationProps, TableProps } from "element-plus";
import type { RouteLocationRaw } from "vue-router";

import type { HttpClientResponse } from "../core/request/HttpClient";

type LayoutProps = InstanceType<typeof CharrueLayout>["$props"];

interface AppConfig {
  appKey: string;
  /**
   * LocalStorage中存储的key的前缀
   * @defaultValue appKey
   */
  storageKey?: string;

  /**
   * 存储在localStorage、sessionStorage的数据的过期时间
   * 单位是秒
   * 默认是7天
   *
   * 可以传入一个数字或者一个对象
   * 如果是数字，那么所有的数据都会使用这个过期时间
   * 如果是对象，那么可以根据key来设置不同的过期时间
   * 传入"*"表示所有的key都会使用这个过期时间
   *
   * @defaultValue 7 * 24 * 60 * 60
   */
  expireTime?: number | Record<string | "*", number>;
}
export interface LayoutConfig {
  data: NonNullable<LayoutProps["data"]>;
  transitionName?: string;
  collapse?: LayoutProps["collapse"];
  fixedHeader?: LayoutProps["fixedHeader"];
  showTrigger?: LayoutProps["showTrigger"];
  logo?: LayoutProps["logo"];
  title?: LayoutProps["title"];
  layout?: LayoutProps["layout"];
  sidebarWidth?: LayoutProps["sidebarWidth"];
  activeMenuRules?: LayoutProps["activeMenuRules"];
  /**
   * 是否启用导航标签页
   * @defaultValue false
   */
  enableNavigationTab?: boolean;
  /**
   * 导航标签页的数据存储的名称
   * @defaultValue "tabView"
   */
  tabViewStorageName?: string;
  ignoreNavigationTabKey?: string;
}

interface StoreConfig<GlobalUserInfo> {
  formatUserData: (userInfo: unknown) => GlobalUserInfo;
}

interface FetchConfig {
  /**
   * 请求的基础路径
   */
  baseUrl: string;
  /**
   * 不需要token的请求路径
   */
  tokenWhiteList?: string[];
  /**
   * 获取用户信息的请求
   */
  fetchUserInfo: () => Promise<HttpClientResponse>;
  /**
   * 登录的请求
   */
  login: (data: any) => Promise<HttpClientResponse>;
  /**
   * 获取登录后的token
   */
  getTokenAfterLogin: (data: any) => string | Promise<string>;
}

interface ComponentConfig {
  paginationView?: {
    formProps?: Partial<Omit<FormProps, "model">>;
    tableProps?: Partial<Omit<TableProps<unknown>, "data">>;
    paginationProps?: Partial<PaginationProps>;
    formatColumnValue?: (key: string, value: any) => any;
    formatQueryValue?: (key: string, value: any) => any;
  };
  upload?: {
    url: string;
    transformImageUrl: (data: HttpClientResponse) => string;
  };
}

interface RouterConfig {
  /**
   * 登录页路由
   * @defaultValue /account/login
   * */
  loginRoute?: RouteLocationRaw;
  /**
   * 首页路由
   * @defaultValue /
   * */
  homeRoute?: RouteLocationRaw;
  /**
   * 路由跳转前是否需要判断token
   * */
  enableTokenAuth?: boolean;
  /**
   * 无论是否有token，都可以直接访问的路由
   * */
  unimpededRoutes?: string[];
  /**
   * 只能在未登录情况下访问的页面
   * 如果已登录，访问这些页面会自动跳转到homeRoute
   * */
  unloggedOnlyRoutes?: string[];
}

export interface DoainDefaultUserInfo {
  username: string;
  userId: number | string;
  [key: string]: any;
}

export interface DoainClientConfig<GlobalUserInfo = DoainDefaultUserInfo> {
  app: AppConfig;
  layout: LayoutConfig;
  store: StoreConfig<GlobalUserInfo>;
  fetch: FetchConfig;
  component?: ComponentConfig;
  router: RouterConfig;
}
