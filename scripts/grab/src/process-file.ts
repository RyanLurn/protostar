import type { ConsolaInstance } from "consola";
import type { Result } from "neverthrow";

import { err, ok } from "neverthrow";
import { parse } from "path";

import { formatOutput } from "@/format-output";
import { LOG_PREFIX } from "@/constants";

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
  logger.info(
    `${LOG_PREFIX} Processing file (${index + 1}/${totalFiles}): ${path}`
  );

  try {
    const content = await Bun.file(path).text();
    logger.debug(`${LOG_PREFIX} Got content: ${content.slice(0, 100)}...`);

    const parsedFile = parse(path);
    logger.debug(
      `${LOG_PREFIX} Parse file result: ${JSON.stringify(parsedFile)}`
    );

    const formattedOutput = formatOutput({
      ext: parsedFile.ext,
      content,
      path,
    });
    logger.debug(
      `${LOG_PREFIX} Formatted content: ${formattedOutput.slice(0, 100)}...`
    );

    logger.success(`${LOG_PREFIX} Successfully processed file: ${path}`);
    return ok(formattedOutput);
  } catch (error) {
    logger.error(`${LOG_PREFIX} Failed to process file: ${path}`);
    logger.error(error);

    return err(error);
  }
}
