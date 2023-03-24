import Pages from "@charrue/vite-plugin-pages";
import { definePageRoutePlugin, resolveRouteBlock } from "@charrue/vite-plugin-pages-extend";
import PageLayout from "@charrue/vite-plugin-vue-layouts";
import VuePlugin from "@vitejs/plugin-vue";
import vueJsxPlugin from "@vitejs/plugin-vue-jsx";
import _VisualizerPlugin from "rollup-plugin-visualizer";
import UnocssPlugin from "unocss/vite";
import AutoImportPlugin from "unplugin-auto-import/vite";
import { FileSystemIconLoader } from "unplugin-icons/loaders";
import IconsResolver from "unplugin-icons/resolver";
import IconsPlugin from "unplugin-icons/vite";
import { ElementPlusResolver } from "unplugin-vue-components/resolvers";
import VueComponentsPlugin from "unplugin-vue-components/vite";
import type { Options as VueDefineOptionsOptions } from "unplugin-vue-define-options";
import VueDefineOptions from "unplugin-vue-define-options/vite";
import { defineConfig as defineViteConfig, mergeConfig } from "vite";
import type { PluginOption } from "vite";

// import { normalizePath } from "vite"
// import { join } from "path"
import { createClientAlias } from "./alias";
import { BuiltPlugins, NotBool, PluginOptions } from "./types";

const VisualizerPlugin = (_VisualizerPlugin as any).default || _VisualizerPlugin;

// eslint-disable-next-line max-statements
function createBuiltPlugins(pluginOption: PluginOptions["plugins"] = {}): PluginOption[] {
  const {
    vue,
    vueJsx,
    pages,
    pageLayout,
    unocss,
    autoImport,
    vueComponents,
    visualizer,
    icons,
    vueDefineOptions,
  } = pluginOption;

  const plugins: PluginOption[] = [];

  if (vue) {
    plugins.push(VuePlugin(defaultVueOptions));
  }
  if (vueJsx !== false) {
    plugins.push(vueJsxPlugin(vueJsx));
  }
  if (pages !== false) {
    plugins.push(
      Pages({
        ...pages,
        resolveRouteBlock,
      }),
    );
    plugins.push(definePageRoutePlugin());
  }
  if (pageLayout !== false) {
    plugins.push(PageLayout(pageLayout));
  }
  if (unocss !== false) {
    plugins.push(UnocssPlugin(unocss));
  }
  if (autoImport !== false) {
    plugins.push(AutoImportPlugin(autoImport));
  }
  if (vueComponents !== false) {
    plugins.push(VueComponentsPlugin(vueComponents));
  }
  if (visualizer !== false) {
    plugins.push(VisualizerPlugin(visualizer));
  }
  if (icons !== false) {
    plugins.push(IconsPlugin(icons));
  }
  if (vueDefineOptions !== false) {
    plugins.push(VueDefineOptions(vueDefineOptions));
  }

  return plugins;
}

const defaultVueOptions: NotBool<BuiltPlugins["vue"]> = {};
const defaultVueJsxOptions: NotBool<BuiltPlugins["vueJsx"]> = {};
const defaultVuePagesOptions: NotBool<BuiltPlugins["pages"]> = {
  dirs: "src/modules",
  extensions: ["vue", "tsx"],
  exclude: ["**/components/*.vue"],
};
const defaultVuePageLayoutOptions: NotBool<BuiltPlugins["pageLayout"]> = {
  layoutsDirs: "src/layouts",
  defaultLayout: "default",
  extensions: ["vue", "tsx"],
};
const defaultUnocssOptions: NotBool<BuiltPlugins["unocss"]> = {};
const defaultAutoImportOptions: NotBool<BuiltPlugins["autoImport"]> = {
  include: [/\.[tj]sx?$/, /\.vue$/, /\.vue\?vue/],
  imports: ["vue", "vue-router", "@vueuse/core"],
};
const defaultVueComponentsOptions: NotBool<BuiltPlugins["vueComponents"]> = {
  dirs: ["src/components"],
  extensions: ["vue", "tsx"],
  resolvers: [
    ElementPlusResolver({
      importStyle: false,
    }),
    IconsResolver({
      customCollections: ["custom"],
    }),
  ],
};
const defaultVisualizerOptions: NotBool<BuiltPlugins["visualizer"]> = {};
const defaultIconOptions: NotBool<BuiltPlugins["icons"]> = {
  scale: 1,
  defaultClass: "global-doain-icon",
  compiler: "vue3",
  customCollections: {
    custom: FileSystemIconLoader("src/icons"),
  },
};
const defaultVueDefineOptions: VueDefineOptionsOptions = {
  version: 3,
};

export const plugins = [
  VuePlugin(defaultVueOptions),
  vueJsxPlugin(defaultVueJsxOptions),
  Pages(defaultVuePagesOptions),
  definePageRoutePlugin(),
  PageLayout(defaultVuePageLayoutOptions),
  UnocssPlugin(defaultUnocssOptions),
  AutoImportPlugin(defaultAutoImportOptions),
  VueComponentsPlugin(defaultVueComponentsOptions),
  VisualizerPlugin(defaultVisualizerOptions),
  IconsPlugin(defaultIconOptions),
  VueDefineOptions(defaultVueDefineOptions),
];

export const DoainNodePlugin = (options: PluginOptions = {}): PluginOption => {
  let userConfigFiles: string[] = [];

  function mergeBuiltPluginOptions<N extends keyof BuiltPlugins>(
    name: N,
    defaults: Partial<BuiltPlugins[N]> = {},
  ): BuiltPlugins[N] {
    const pluginOptions = options.plugins?.[name];
    // 如果传入false，则表示禁用该插件
    if (pluginOptions === false) return false;
    return { ...defaults, ...(pluginOptions || {}) };
  }

  const builtPlugins = createBuiltPlugins({
    vue: mergeBuiltPluginOptions("vue", defaultVueOptions),
    vueJsx: mergeBuiltPluginOptions("vueJsx", defaultVueJsxOptions),
    pages: mergeBuiltPluginOptions("pages", defaultVuePagesOptions),
    pageLayout: mergeBuiltPluginOptions("pageLayout", defaultVuePageLayoutOptions),
    unocss: mergeBuiltPluginOptions("unocss", defaultUnocssOptions),
    autoImport: mergeBuiltPluginOptions("autoImport", defaultAutoImportOptions),
    vueComponents: mergeBuiltPluginOptions("vueComponents", defaultVueComponentsOptions),
    visualizer: mergeBuiltPluginOptions("visualizer", defaultVisualizerOptions),
    icons: mergeBuiltPluginOptions("icons", defaultIconOptions),
    vueDefineOptions: mergeBuiltPluginOptions("vueDefineOptions", defaultVueDefineOptions),
  });

  const doainPlugin: PluginOption = {
    name: "doain-node-plugin",

    // 合并一些默认的配置
    async config(config) {
      const root = config.root || process.cwd();
      const alias = createClientAlias(root);
      userConfigFiles = alias.slice(1).map((a) => a.replacement);
      const baseConfig = defineViteConfig({
        resolve: {
          alias,
        },
      });

      return mergeConfig(baseConfig, config);
    },

    configureServer(server) {
      // 监听配置文件及其依赖的变化，以便于更新
      userConfigFiles.forEach((f) => {
        server.watcher.add(f);
      });
    },
  };

  return [...builtPlugins, doainPlugin];
};
