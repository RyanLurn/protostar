import type { ConsolaInstance } from "consola";
import type { Result } from "neverthrow";

import { err, ok } from "neverthrow";
import { parse } from "path";

import { formatOutput } from "@/format-output";

const ignoredExts = [".lock", ".svg"];

export async function processFile({
  totalFiles,
  logger,
  index,
  path,
}: {
  logger: ConsolaInstance;
  totalFiles: number;
  index: number;
  path: string;
}): Promise<Result<string, unknown>> {
  logger.info(`Processing file (${index + 1}/${totalFiles}): ${path}`);

  try {
    const parsedFile = parse(path);
    const ext = parsedFile.ext;

    let content: string;
    if (ignoredExts.includes(ext)) {
      content = "[SKIPPED]";
    } else {
      content = await Bun.file(path).text();
    }
    logger.debug(`Got content: ${content.slice(0, 100)}...`);

    const formattedOutput = formatOutput({
      content,
      path,
      ext,
    });
    logger.debug(`Formatted content: ${formattedOutput.slice(0, 100)}...`);

    logger.success(`Successfully processed file at: ${path}`);
    return ok(formattedOutput);
  } catch (error) {
    logger.error(
      new Error(`Failed to process file at: ${path}`, {
        cause: error,
      })
    );
    return err(error);
  }
}
