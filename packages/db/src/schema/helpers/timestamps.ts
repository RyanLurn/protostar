import { integer } from "drizzle-orm/sqlite-core";

import { jsDate } from "@/schema/helpers/js-date";

export const timestamps = {
  updatedAt: integer("updated_at", { mode: "timestamp" })
    .notNull()
    .default(jsDate)
    .$onUpdate(() => new Date()),

  createdAt: integer("created_at", { mode: "timestamp" })
    .notNull()
    .default(jsDate),
};
