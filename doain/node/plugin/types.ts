import type { UserOptions as PagesPluginOptions } from "@charrue/vite-plugin-pages";
import type { UserOptions as PageLayoutPluginOptions } from "@charrue/vite-plugin-vue-layouts";
import type { Options as VuePluginOptions } from "@vitejs/plugin-vue";
import type { Options as VueJsxPluginOptions } from "@vitejs/plugin-vue-jsx";
import type { PluginVisualizerOptions } from "rollup-plugin-visualizer";
import type { VitePluginConfig as UnocssPluginOptions } from "unocss/vite";
import AutoImportPlugin from "unplugin-auto-import/vite";
import type { Options as IconOptions } from "unplugin-icons/types";
import type { Options as VueComponentsOptions } from "unplugin-vue-components";
import type { Options as VueDefineOptionsOptions } from "unplugin-vue-define-options";

type AutoImportPluginOptions = Parameters<typeof AutoImportPlugin>[0];

export interface BuiltPlugins {
  vue: VuePluginOptions | false;
  vueJsx: VueJsxPluginOptions | false;
  pages: PagesPluginOptions | false;
  pageLayout: PageLayoutPluginOptions | false;
  unocss: UnocssPluginOptions | false;
  autoImport: AutoImportPluginOptions | false;
  vueComponents: VueComponentsOptions | false;
  visualizer: PluginVisualizerOptions | false;
  icons: IconOptions | false;
  vueDefineOptions: VueDefineOptionsOptions | false;
}

export interface PluginOptions {
  plugins?: Partial<BuiltPlugins>;
}

export type NotBool<T> = T extends boolean ? never : T;
