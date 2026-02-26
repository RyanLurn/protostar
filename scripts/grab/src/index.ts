import { createConsola, consola } from "consola";
import { parse, join } from "path";
import { stat } from "fs/promises";
import { $ } from "bun";

import { processFile } from "@/process-file";
import { getInputs } from "@/get-inputs";
import { OUT_DIR } from "@/constants";

consola.start(`Grabbing file(s)...`);

const inputs = getInputs();

const logger = createConsola({
  level: inputs["log-level"],
});

let outputContent = "";

try {
  const stats = await stat(inputs.path);

  if (!stats.isDirectory()) {
    logger.error(new Error("Path is not a directory"));
    process.exit(1);
  }

  const gitLsFilesOutput = await $`git ls-files`.cwd(inputs.path).text();
  logger.debug("Files to grab:\n", gitLsFilesOutput);

  const filePaths = gitLsFilesOutput.trim().split("\n");
  const totalFiles = filePaths.length;

  for (const [index, filePath] of filePaths.entries()) {
    const path = join(inputs.path, filePath);
    const processFileResult = await processFile({
      totalFiles,
      logger,
      index,
      path,
    });

    if (processFileResult.isErr()) {
      process.exit(1);
    }

    outputContent += processFileResult.value;
    outputContent += "\n";
  }

  await Bun.write(
    join(OUT_DIR, `${parse(inputs.path).name}.md`),
    outputContent
  );
  consola.success(
    `Saved results to ${join(OUT_DIR, `${parse(inputs.path).name}.md`)}`
  );
} catch (error) {
  logger.error(new Error("Failed to grab file(s)", { cause: error }));
  process.exit(1);
}
