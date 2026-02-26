import type { Result } from "neverthrow";

import { readdir } from "fs/promises";
import { err, ok } from "neverthrow";
import consola from "consola";
import { join } from "path";

import { processFile } from "@/process-file";
import { dirWord } from "@/constants";

export async function processDir({
  dirPath,
}: {
  dirPath: string;
}): Promise<Result<string, unknown>> {
  consola.info(`[grab script] Processing ${dirWord}: ${dirPath}`);

  let outputContent = "";

  try {
    const entries = await readdir(dirPath, {
      withFileTypes: true,
      recursive: true,
    });
    consola.debug("[grab script] Got entries:");
    consola.debug(entries);

    const filePaths = entries.map((entry) => join(dirPath, entry.name));
    const totalFiles = filePaths.length;
    consola.debug(`[grab script] Got ${totalFiles} files:`);
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
      consola.debug(`[grab script] Added content from: ${path}`);
    }

    return ok(outputContent);
  } catch (error) {
    consola.error(`[grab script] Failed to process ${dirWord}: ${dirPath}`);
    consola.error(error);

    return err(error);
  }
}
