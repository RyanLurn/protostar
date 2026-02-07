import { groq } from "#lib/ai/groq";
import { systemPrompt } from "#prompts/system";
import { generateText, type ModelMessage } from "ai";
import { err, ok, Result } from "neverthrow";
import { serializeError, type ErrorObject } from "serialize-error";

export async function generate({
  messages,
}: {
  messages: ModelMessage[];
}): Promise<Result<string, ErrorObject>> {
  try {
    const { text } = await generateText({
      model: groq("llama-3.1-8b-instant"),
      system: systemPrompt,
      messages,
      timeout: 120000,
    });

    return ok(text);
  } catch (error) {
    const serializedError = serializeError(error);
    return err(serializedError);
  }
}
