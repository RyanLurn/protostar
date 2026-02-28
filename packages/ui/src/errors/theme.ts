import { ProtostarError } from "@protostar/error";

export class ThemeStorageError extends ProtostarError {
  declare code: "THEME_STORAGE_ERROR";
  declare cause: DOMException;

  constructor(message: string, { cause }: { cause: DOMException }) {
    super(message, {
      code: "THEME_STORAGE_ERROR",
      retryable: false,
      expected: true,
      cause,
    });
  }
}
