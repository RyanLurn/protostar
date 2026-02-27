import { drizzle } from "drizzle-orm/libsql";

import { counterTable } from "@/schema/tables/count";
import { envVars } from "@/env-vars";

export const db = drizzle(envVars.DB_FILE_NAME, {
  schema: { ...counterTable },
});
