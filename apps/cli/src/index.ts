let alive: boolean = true;
let turn: number = 0;

while (alive) {
  console.log(`\nTurn ${turn}:`);
  turn++;
  Bun.sleepSync(300);
}
