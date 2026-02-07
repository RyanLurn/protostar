import { join } from "node:path";

let alive: boolean = true;
let turn: number = 0;

const systemPrompt = await Bun.file(
  join(import.meta.dir, "prompts/prime.md")
).text();

while (alive) {
  console.log(`\nTurn ${turn}:`);
  turn++;
  Bun.sleepSync(300);
}
