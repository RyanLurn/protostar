import { UnexpectedError } from "@/classes/unexpected";
import { UnknownError } from "@/classes/unknown";

export function createFallbackError(
  message: string,
  {
    context,
    cause,
  }: {
    context?: Record<string, unknown>;
    cause: unknown;
  }
) {
  if (cause instanceof Error) {
    return new UnexpectedError(message, { context, cause });
  }
  return new UnknownError(message, { context, cause });
}
