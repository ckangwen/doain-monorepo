import { existsSync } from "fs";
import { join as _join } from "path";
import { normalizePath } from "vite";
import type { Alias } from "vite";

const join = (...args: Parameters<typeof _join>) => {
  return normalizePath(_join(...args));
};

export function createClientAlias(root: string): Alias[] {
  const alias = [
    {
      find: "@",
      replacement: join(root, "src"),
    },
    {
      find: "~doain/config",
      replacement: ["ts", "js"]
        .map((ext) => join(root, `src/.doain.config.${ext}`))
        .find(existsSync)!,
    },
    {
      find: "~utils",
      replacement: join(root, `src/utils`),
    },
    {
      find: "~components",
      replacement: join(root, `src/components`),
    },
  ];

  return alias;
}
