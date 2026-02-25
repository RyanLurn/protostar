import { globalIgnores } from "eslint/config";

export const globalIgnoreConfig = globalIgnores([
  "**/routeTree.gen.ts",
  "**/migrations/",
  "**/.tanstack/",
  "**/dist/",
  "**/build/",
]);
