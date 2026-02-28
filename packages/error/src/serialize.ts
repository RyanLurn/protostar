import { serializeError } from "serialize-error";

import type { ProtostarError } from "@/base-error";

import { serializeUnknownError } from "@/unknown-error";

export function serializeProtostarError(error: ProtostarError) {
  const cause = error.cause;
  const serializedCause =
    cause instanceof Error
      ? serializeError(cause)
      : serializeUnknownError(cause);

  const serializedError = {
    retryable: error.retryable,
    expected: error.expected,
    message: error.message,
    context: error.context,
    cause: serializedCause,
    name: error.name,
    code: error.code,
  };

  return serializedError;
}
