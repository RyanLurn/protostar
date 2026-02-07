import { join } from "node:path";

export const systemPrompt = await Bun.file(
  join(import.meta.dir, "prime.md")
).text();
