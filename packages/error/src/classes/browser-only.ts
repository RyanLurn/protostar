import { ProtostarError } from "@/classes/base";

export class BrowserOnlyError extends ProtostarError {
  declare context: { featureName: string };
  declare code: "BROWSER_ONLY_ERROR";
  declare retryable: false;
  declare expected: true;

  constructor({ context }: { context: { featureName: string } }) {
    super(
      `"${context.featureName}" is a browser-only feature and cannot be used in other environments.`,
      {
        code: "BROWSER_ONLY_ERROR",
        retryable: false,
        expected: true,
        context,
      }
    );
  }
}
