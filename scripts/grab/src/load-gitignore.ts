import type { ConsolaInstance } from "consola";

import { err, ok } from "neverthrow";
import { join } from "path";

import { LOG_PREFIX } from "@/constants";

export async function loadGitignore({ logger }: { logger: ConsolaInstance }) {
  const gitignorePath = join(import.meta.dir, "../../..", ".gitignore");
  logger.info(
    `${LOG_PREFIX} Loading .gitignore file content at: ${gitignorePath}`
  );

  try {
    const gitignoreFile = Bun.file(gitignorePath);

    if (!(await gitignoreFile.exists())) {
      logger.warn(
        `${LOG_PREFIX} Couldn't find .gitignore file at: ${gitignorePath}`
      );
      return ok("");
    }

    const gitignoreContent = await gitignoreFile.text();
    logger.success(
      `${LOG_PREFIX} Loaded .gitignore file content:\n ${gitignoreContent.slice(0, 100)}...`
    );
    return ok(gitignoreContent);
  } catch (error) {
    logger.error(
      `${LOG_PREFIX} Failed to load .gitignore file at: ${gitignorePath}`
    );
    logger.error(error);
    return err(error);
  }
}
