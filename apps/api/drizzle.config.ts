import { defineConfig } from "drizzle-kit";

import { envVars } from "@/lib/env-vars";

export default defineConfig({
  dbCredentials: {
    url: envVars.DB_FILE_NAME,
  },
  schema: "./src/db/schema/tables",
  out: "./src/db/migrations",
  dialect: "sqlite",
});
