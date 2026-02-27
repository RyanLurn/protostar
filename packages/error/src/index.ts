import type { ProtostarErrorCode } from "@/types";

export class ProtostarError extends Error {
  code: ProtostarErrorCode;

  constructor(
    message: string,
    { cause, code }: { code: ProtostarErrorCode; cause?: unknown }
  ) {
    super(message, { cause });
    this.code = code;
  }
}
