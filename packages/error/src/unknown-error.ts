import { ProtostarError } from "@/index";

export class ProtostarUnknownError extends ProtostarError {
  constructor(
    message: string,
    { context, cause }: { context?: Record<string, unknown>; cause: unknown }
  ) {
    const serializedCause = serializeUnknownError(cause);
    super(message, { cause: serializedCause, code: "UNKNOWN_ERROR", context });
  }
}

export function serializeUnknownError(error: unknown): Record<string, unknown> {
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
