import { generate } from "#lib/ai/generate";
import { LOGS_DIR } from "#lib/constants";
import { saveFile } from "#lib/save-file";
import { beat } from "#prompts/beat";
import type { AssistantModelMessage, ModelMessage, UserModelMessage } from "ai";
import { join } from "node:path";

// let alive: boolean = true;
let turn: number = 0;

const messages: ModelMessage[] = [];

while (turn < 5) {
  console.log(`\nTurn ${turn}:`);

  const heartbeatMessage: UserModelMessage = {
    role: "user",
    content: beat(),
  };
  messages.push(heartbeatMessage);

  const generateResult = await generate({ messages });
  if (generateResult.isErr()) {
    console.error(generateResult.error);
    break;
  }
  console.log("Agent responded.");
  const agentMessage: AssistantModelMessage = {
    role: "assistant",
    content: generateResult.value,
  };
  messages.push(agentMessage);

  turn++;
  Bun.sleepSync(500);
}

const outputFilePath = join(LOGS_DIR, `${Date.now()}.json`);

process.on("SIGINT", async () => {
  await saveFile({
    destination: outputFilePath,
    input: JSON.stringify(messages, null, 2),
  });
  process.exit(0);
});

await saveFile({
  destination: outputFilePath,
  input: JSON.stringify(messages, null, 2),
});
