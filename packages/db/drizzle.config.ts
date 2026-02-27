import { defineConfig } from "drizzle-kit";

import { envVars } from "@/env-vars";

export default defineConfig({
  dbCredentials: {
    url: envVars.DB_FILE_NAME,
  },
  schema: "./src/schema/tables",
  out: "./src/migrations",
  dialect: "sqlite",
});
