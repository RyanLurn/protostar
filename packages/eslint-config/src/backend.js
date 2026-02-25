import prettier from "eslint-config-prettier/flat";
import { defineConfig } from "eslint/config";
import globals from "globals";

import { baseConfig } from "./utils/base.js";

export const backendConfig = defineConfig([
  baseConfig,
  {
    languageOptions: {
      globals: {
        ...globals.bunBuiltin,
        ...globals.node,
      },
      parserOptions: {
        projectService: true,
      },
    },
  },
  prettier,
]);
