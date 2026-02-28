import { serializeUnknownError } from "@/serialize";
import { ProtostarError } from "@/classes/base";

export class ProtostarUnknownError extends ProtostarError {
  declare cause: ReturnType<typeof serializeUnknownError>;
  declare code: "UNKNOWN_ERROR";
  declare retryable: false;
  declare expected: false;

  constructor(
    message: string,
    {
      context,
      cause,
    }: {
      context?: Record<string, unknown>;
      cause: unknown;
    }
  ) {
    const serializedCause = serializeUnknownError(cause);
    super(message, {
      cause: serializedCause,
      code: "UNKNOWN_ERROR",
      retryable: false,
      expected: false,
      context,
    });
  }
}
