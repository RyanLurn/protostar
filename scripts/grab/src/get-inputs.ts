import { consola } from "consola";
import { parseArgs } from "util";
import { z } from "zod";

import { LOG_PREFIX, ROOT_DIR } from "@/constants";

export const InputsSchema = z.object({
  "log-level": z.int(),
  path: z.string(),
});

export function getInputs() {
  try {
    const { values } = parseArgs({
      options: {
        "log-level": {
          type: "string",
          default: "1",
        },
        path: {
          default: ROOT_DIR,
          type: "string",
        },
      },
      allowPositionals: true,
      args: Bun.argv,
      strict: true,
    });

    const parseInputsResult = InputsSchema.safeParse({
      "log-level": parseInt(values["log-level"]),
      path: values.path,
    });

    if (!parseInputsResult.success) {
      consola.error(`${LOG_PREFIX} Invalid inputs:`);
      consola.error(z.prettifyError(parseInputsResult.error));
      process.exit(1);
    }

    return parseInputsResult.data;
  } catch (error) {
    consola.error(`${LOG_PREFIX} Failed to parse inputs:`);
    consola.error(error);
    process.exit(1);
  }
}
