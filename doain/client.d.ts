/// <reference types="@charrue/vite-plugin-pages/client" />
/// <reference types="@charrue/vite-plugin-vue-layouts/client" />
/// <reference types="unplugin-vue-define-options/macros-global" />

declare module "~doain/config" {
  const config: import("./dist/config").DoainClientConfig;

  export default config;
}
