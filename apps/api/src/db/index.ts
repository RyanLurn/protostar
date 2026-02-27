import { drizzle } from "drizzle-orm/libsql";

import { counterTable } from "@/db/schema/tables/count";
import { envVars } from "@/lib/env-vars";

export const db = drizzle(envVars.DB_FILE_NAME, {
  schema: { ...counterTable },
});
