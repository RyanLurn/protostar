import { sql } from "drizzle-orm";

export const jsDate = sql`(unixepoch('now', 'subsec') * 1000)`;
