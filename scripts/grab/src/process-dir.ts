import type { ConsolaInstance } from "consola";
import type { Result } from "neverthrow";

import { readdir } from "fs/promises";
import { err, ok } from "neverthrow";
import { join } from "path";
import ignore from "ignore";

import { LOG_PREFIX, DIR_WORD } from "@/constants";
import { loadGitignore } from "@/load-gitignore";
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

    const loadGitignoreResult = await loadGitignore({ logger });
    if (loadGitignoreResult.isErr()) {
      return err(loadGitignoreResult.error);
    }

    const gitignoreFilter = ignore().add(loadGitignoreResult.value);

    const filePaths = entries
      .filter((entry) => entry.isFile())
      .map((entry) => join(dirPath, entry.name));
    const totalFiles = filePaths.length;
    logger.debug(`${LOG_PREFIX} Got ${totalFiles} files:`);
    logger.debug(filePaths);

    const filteredFilePaths = gitignoreFilter.filter(filePaths);
    const totalFilesLeft = filteredFilePaths.length;
    logger.debug(`${LOG_PREFIX} Filtered to ${totalFilesLeft} files:`);
    logger.debug(filteredFilePaths);

    for (const [index, path] of filteredFilePaths.entries()) {
      const processFileResult = await processFile({
        totalFiles: totalFilesLeft,
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
