import DoainPlugin from "doain/node";
import { defineConfig } from "vite";

const config = defineConfig({
  base: "./",
  plugins: [DoainPlugin()],
});

export default config;
