import type { Result } from "neverthrow";

import { err, ok } from "neverthrow";

import { UserThemeSchema, type UserTheme } from "@/theme/schemas";
import { THEME_STORAGE_KEY } from "@/theme/constants";
import { ThemeStorageError } from "@/errors/theme";

export function getStoredTheme(): Result<UserTheme, unknown> {
  if (typeof window === "undefined") {
    return ok("system");
  }

  try {
    const storedTheme = localStorage.getItem(THEME_STORAGE_KEY);
    const theme = UserThemeSchema.parse(storedTheme);
    return ok(theme);
  } catch (error) {
    if (error instanceof DOMException && error.name === "SecurityError") {
      return err(
        new ThemeStorageError("Failed to read theme from storage", {
          cause: error,
        })
      );
    }

    return err(error);
  }
}
