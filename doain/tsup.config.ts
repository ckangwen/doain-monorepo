import { defineConfig } from "tsup";

const pkgs = ["components", "composables", "config", "core", "node", "toolkit"].reduce(
  (acc, name) => {
    acc[name] = `./${name}/index.ts`;
    return acc;
  },
  {} as unknown as Record<string, string>,
);
export default defineConfig({
  entry: {
    ...pkgs,
  },
  dts: true,
  format: ["esm", "cjs"],
  external: ["~doain/config", "virtual:generated-layouts", "virtual:generated-pages"],
  splitting: true,
  clean: true,
});
