import userDoainConfig from "~doain/config";

import { lStorage, sStorage } from "./storage";
import { cookieStorage } from "./cookie";

export const TOKEN_STORAGE_KEY = "APP_TOKEN";

export const getToken = () => lStorage.get(TOKEN_STORAGE_KEY);

export const setToken = (value: string) => {
  lStorage.set(TOKEN_STORAGE_KEY, value);
};

export const removeToken = () => {
  lStorage.remove(TOKEN_STORAGE_KEY);
};

const UNIQUE_VALUE_STORAGE_KEY = `${
  userDoainConfig.app.storageKey || userDoainConfig.app.appKey
}.unique.key`;

/**
 * @description 保证环境唯一性, 用于多个环境共用一个浏览器时, 清除storage
 * @param uniqueValue {string} 唯一值, 可以使用接口的基础路径
 */
export const ensureUniqueEnv = (uniqueValue: string, backLoginPage: () => void) => {
  const storageValue = lStorage.get(UNIQUE_VALUE_STORAGE_KEY);
  if (storageValue !== uniqueValue) {
    cookieStorage.removeAll();
    sStorage.clearAll();
    lStorage.clearAll();
    lStorage.set(UNIQUE_VALUE_STORAGE_KEY, uniqueValue);
    backLoginPage();
  }
};
