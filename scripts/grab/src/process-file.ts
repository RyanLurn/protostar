import type { Result } from "neverthrow";

import { err, ok } from "neverthrow";
import { consola } from "consola";
import { parse } from "path";

import { formatOutput } from "@/format-output";

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
    `[grab script] Processing file (${index + 1}/${totalFiles}): ${path}`
  );

  try {
    const content = await Bun.file(path).text();
    consola.debug(`[grab script] Got content: ${content.slice(0, 100)}...`);

    const parsedFile = parse(path);
    consola.debug(
      `[grab script] Parse file result: ${JSON.stringify(parsedFile)}`
    );

    const formattedOutput = formatOutput({
      ext: parsedFile.ext,
      content,
      path,
    });
    consola.debug(
      `[grab script] Formatted content: ${formattedOutput.slice(0, 100)}...`
    );

    consola.success(`[grab script] Successfully processed file: ${path}`);
    return ok(formattedOutput);
  } catch (error) {
    consola.error(`[grab script] Failed to process file: ${path}`);
    consola.error(error);

    return err(error);
  }
}
