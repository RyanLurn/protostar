import type { Result } from "neverthrow";

import { err, ok } from "neverthrow";
import { consola } from "consola";
import { parse } from "path";

import { formatOutput } from "@/format-output";
import { LOG_PREFIX } from "@/constants";

export async function processFile({
  totalFiles,
  index,
  path,
}: {
  totalFiles: number;
  index: number;
  path: string;
}): Promise<Result<string, unknown>> {
  consola.start(
    `${LOG_PREFIX} Processing file (${index + 1}/${totalFiles}): ${path}`
  );

  try {
    const content = await Bun.file(path).text();
    consola.debug(`${LOG_PREFIX} Got content: ${content.slice(0, 100)}...`);

    const parsedFile = parse(path);
    consola.debug(
      `${LOG_PREFIX} Parse file result: ${JSON.stringify(parsedFile)}`
    );

    const formattedOutput = formatOutput({
      ext: parsedFile.ext,
      content,
      path,
    });
    consola.debug(
      `${LOG_PREFIX} Formatted content: ${formattedOutput.slice(0, 100)}...`
    );

    consola.success(`${LOG_PREFIX} Successfully processed file: ${path}`);
    return ok(formattedOutput);
  } catch (error) {
    consola.error(`${LOG_PREFIX} Failed to process file: ${path}`);
    consola.error(error);

    return err(error);
  }
}
