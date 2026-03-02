import reactHooks from "eslint-plugin-react-hooks";
import prettier from "eslint-config-prettier/flat";
import { defineConfig } from "eslint/config";
import jsxA11y from "eslint-plugin-jsx-a11y";
import globals from "globals";

import { baseConfig } from "./utils/base.js";

export const fullstackConfig = defineConfig([
  baseConfig,
  {
    languageOptions: {
      globals: {
        ...globals.bunBuiltin,
        ...globals.browser,
      },
      parserOptions: {
        projectService: true,
      },
    },
  },
  reactHooks.configs.flat.recommended,
  jsxA11y.flatConfigs.recommended,
  prettier,
]);
