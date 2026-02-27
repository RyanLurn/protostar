/* eslint-disable perfectionist/sort-objects */

import { sqliteTable, integer, text } from "drizzle-orm/sqlite-core";

import { timestamps } from "@/db/schema/helpers/timestamps";
import { id } from "@/db/schema/helpers/id";

export const counterTable = sqliteTable("counters", {
  id,
  name: text("name").notNull(),
  value: integer("value").notNull().default(0),
  ...timestamps,
});
