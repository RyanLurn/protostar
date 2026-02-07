import { env } from "#lib/env";
import { createGroq } from "@ai-sdk/groq";

export const groq = createGroq({
  apiKey: env.GROQ_API_KEY,
});
