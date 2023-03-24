import { DoainClientConfig, DoainDefaultUserInfo } from "./types";

export const defineClientConfig = <T extends DoainDefaultUserInfo = DoainDefaultUserInfo>(
  config: DoainClientConfig<T>,
) => {
  return config;
};

export * from "./types";
