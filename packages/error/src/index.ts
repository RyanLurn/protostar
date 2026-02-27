export class ProtostarError extends Error {
  context: Record<string, unknown> | undefined;
  code: string;

  constructor(
    message: string,
    {
      context,
      cause,
      code,
    }: { context?: Record<string, unknown>; cause?: unknown; code: string }
  ) {
    super(message, { cause });
    this.code = code;
    this.context = context;
  }
}
