import type { Result } from "neverthrow";

import { readdir } from "fs/promises";
import { err, ok } from "neverthrow";
import consola from "consola";
import { join } from "path";

import { LOG_PREFIX, DIR_WORD } from "@/constants";
import { processFile } from "@/process-file";

export async function processDir({
  dirPath,
}: {
  dirPath: string;
}): Promise<Result<string, unknown>> {
  consola.info(`${LOG_PREFIX} Processing ${DIR_WORD}: ${dirPath}`);

  let outputContent = "";

  try {
    const entries = await readdir(dirPath, {
      withFileTypes: true,
      recursive: true,
    });
    consola.debug(`${LOG_PREFIX} Got entries:`);
    consola.debug(entries);

    const filePaths = entries.map((entry) => join(dirPath, entry.name));
    const totalFiles = filePaths.length;
    consola.debug(`${LOG_PREFIX} Got ${totalFiles} files:`);
    consola.debug(filePaths);

    for (const [index, path] of filePaths.entries()) {
      const processFileResult = await processFile({
        totalFiles,
        index,
        path,
      });

      if (processFileResult.isErr()) {
        return err(processFileResult.error);
      }

      outputContent += processFileResult.value;
      outputContent += "\n";
      consola.debug(`${LOG_PREFIX} Added content from: ${path}`);
    }

    return ok(outputContent);
  } catch (error) {
    consola.error(`${LOG_PREFIX} Failed to process ${DIR_WORD}: ${dirPath}`);
    consola.error(error);

    return err(error);
  }
}
