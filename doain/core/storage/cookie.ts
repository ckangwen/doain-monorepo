import userDoainConfig from "~doain/config";

import Cookie, { CookieAttributes } from "js-cookie";

export const cookieStorage = {
  get: (key?: string) => {
    if (!key) {
      return Cookie.get();
    }
    return Cookie.get(`${userDoainConfig.app.appKey}_${key}`);
  },
  set: (key: string, value: string, option?: CookieAttributes) =>
    Cookie.set(`${userDoainConfig.app.appKey}_${key}`, value, option),
  remove: (key: string, option?: CookieAttributes) =>
    Cookie.remove(`${userDoainConfig.app.appKey}_${key}`, option),
};
