import { join } from "path";

export const LOG_PREFIX = "[grab script]";
export const DIR_WORD = process.platform === "win32" ? "folder" : "directory";
export const OUT_DIR = join(import.meta.dir, "..", "grabbed");
