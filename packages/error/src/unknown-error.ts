import { ProtostarError } from "@/index";

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

export function serializeUnknownError(error: unknown): {
  value: unknown;
  type: string;
} {
  // Null / undefined
  if (error === null || error === undefined) {
    return { value: String(error), type: "nullish" };
  }

  // Primitive (string, number, boolean, bigint, symbol)
  if (typeof error !== "object" && typeof error !== "function") {
    return {
      value: typeof error === "symbol" ? error.toString() : error,
      type: typeof error,
    };
  }

  // Plain object or anything else — attempt structured serialization
  try {
    return {
      value: JSON.parse(JSON.stringify(error)),
      type: "object",
    };
  } catch {
    // Circular references, non-serializable values, etc.
    return {
      type: "unserializable",
      // eslint-disable-next-line @typescript-eslint/no-base-to-string
      value: String(error),
    };
  }
}
