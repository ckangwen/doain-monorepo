import { lStorage } from "./storage";

export const TOKEN_STORAGE_KEY = "APP_TOKEN";

export const getToken = () => lStorage.get(TOKEN_STORAGE_KEY);

export const setToken = (value: string) => {
  lStorage.set(TOKEN_STORAGE_KEY, value);
};

export const removeToken = () => {
  lStorage.remove(TOKEN_STORAGE_KEY);
};

// TODO: 接口变化后，需要重置token
