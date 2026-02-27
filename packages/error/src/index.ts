export class ProtostarError extends Error {
  context?: Record<string, unknown>;
  retryable?: boolean;
  code: string;

  constructor(
    message: string,
    {
      retryable,
      context,
      cause,
      code,
    }: {
      context?: Record<string, unknown>;
      retryable?: boolean;
      cause?: unknown;
      code: string;
    }
  ) {
    super(message, { cause });
    this.context = context;
    this.retryable = retryable;
    this.code = code;
  }
}
