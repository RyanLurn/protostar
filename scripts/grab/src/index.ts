import { createConsola, consola } from "consola";
import { parse, join } from "path";
import { stat } from "fs/promises";

import { LOG_PREFIX, OUT_DIR } from "@/constants";
import { processFile } from "@/process-file";
import { processDir } from "@/process-dir";
import { getInputs } from "@/get-inputs";

consola.start("Grabbing file(s)...");

const inputs = getInputs();

const logger = createConsola({
  level: inputs["log-level"],
});

let outputContent = "";

try {
  const stats = await stat(inputs.path);

  if (stats.isDirectory()) {
    const processDirResult = await processDir({
      dirPath: inputs.path,
      logger,
    });

    if (processDirResult.isErr()) {
      process.exit(1);
    }

    outputContent += processDirResult.value;
  } else {
    const processFileResult = await processFile({
      path: inputs.path,
      totalFiles: 1,
      index: 0,
      logger,
    });

    if (processFileResult.isErr()) {
      process.exit(1);
    }

    outputContent += processFileResult.value;
  }

  await Bun.write(
    join(OUT_DIR, `${parse(inputs.path).name}.md`),
    outputContent
  );
  logger.success(
    `${LOG_PREFIX} Saved results to ${join(OUT_DIR, `${parse(inputs.path).name}.md`)}`
  );
} catch (error) {
  logger.error(`${LOG_PREFIX} Failed to grab file(s)`);
  logger.error(error);
  process.exit(1);
}
