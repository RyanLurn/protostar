import { consola } from "consola";
import { parseArgs } from "util";
import { z } from "zod";

export const InputsSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1)
    .max(16)
    .refine(
      (value) => {
        if (value.startsWith("@") || value.includes("/")) {
          return false;
        }
      },
      {
        error: `Package name should NOT start with "@" or include "/". Gen script already adds "@protostar/" to the beginning of the name.`,
      }
    ),
  type: z.enum(["app", "script", "package"]),
  logLevel: z.int(),
});

export function getInputs() {
  try {
    const { values } = parseArgs({
      options: {
        "log-level": {
          type: "string",
          default: "1",
          short: "l",
        },
        type: {
          default: "package",
          type: "string",
          short: "t",
        },
      },
      allowPositionals: true,
      args: Bun.argv,
      strict: true,
    });

    const parseInputsResult = InputsSchema.safeParse({
      logLevel: parseInt(values["log-level"]),
      type: values.type,
    });

    if (!parseInputsResult.success) {
      consola.error(z.prettifyError(parseInputsResult.error));
      process.exit(1);
    }

    return parseInputsResult.data;
  } catch (error) {
    consola.error(error);
    process.exit(1);
  }
}
