import type { ConsolaInstance } from "consola";
import type { Result } from "neverthrow";

import { readdir } from "fs/promises";
import { err, ok } from "neverthrow";
import { join } from "path";

import { LOG_PREFIX, DIR_WORD } from "@/constants";
import { processFile } from "@/process-file";

export async function processDir({
  dirPath,
  logger,
}: {
  logger: ConsolaInstance;
  dirPath: string;
}): Promise<Result<string, unknown>> {
  logger.info(`${LOG_PREFIX} Processing ${DIR_WORD}: ${dirPath}`);

  let outputContent = "";

  try {
    const entries = await readdir(dirPath, {
      withFileTypes: true,
      recursive: true,
    });
    logger.debug(`${LOG_PREFIX} Got entries:`);
    logger.debug(entries);

    const filePaths = entries.map((entry) => join(dirPath, entry.name));
    const totalFiles = filePaths.length;
    logger.debug(`${LOG_PREFIX} Got ${totalFiles} files:`);
    logger.debug(filePaths);

    for (const [index, path] of filePaths.entries()) {
      const processFileResult = await processFile({
        totalFiles,
        logger,
        index,
        path,
      });

      if (processFileResult.isErr()) {
        return err(processFileResult.error);
      }

      outputContent += processFileResult.value;
      outputContent += "\n";
      logger.debug(`${LOG_PREFIX} Added content from: ${path}`);
    }

    return ok(outputContent);
  } catch (error) {
    logger.error(`${LOG_PREFIX} Failed to process ${DIR_WORD}: ${dirPath}`);
    logger.error(error);

    return err(error);
  }
}
