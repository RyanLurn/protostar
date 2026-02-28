import { ProtostarUnexpectedError } from "@/classes/unexpected";
import { ProtostarUnknownError } from "@/classes/unknown";

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
    return new ProtostarUnexpectedError(message, { context, cause });
  }
  return new ProtostarUnknownError(message, { context, cause });
}
