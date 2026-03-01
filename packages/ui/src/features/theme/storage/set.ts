import type { UnexpectedError, UnknownError } from "@protostar/error";
import type { Result } from "neverthrow";

import { createFallbackError, BrowserOnlyError } from "@protostar/error";
import { err, ok } from "neverthrow";

import { UserThemeSchema, type UserTheme } from "@/features/theme/schemas";
import { THEME_STORAGE_KEY } from "@/features/theme/constants";
import { ThemeStorageError } from "@/errors/theme";

export function setStoredTheme({
  theme,
}: {
  theme: UserTheme;
}): Result<
  void,
  ThemeStorageError | BrowserOnlyError | UnexpectedError | UnknownError
> {
  if (typeof window === "undefined") {
    return err(
      new BrowserOnlyError({
        context: { feature: "setStoredTheme", apis: ["localStorage"] },
      })
    );
  }

  try {
    const validTheme = UserThemeSchema.parse(theme);
    localStorage.setItem(THEME_STORAGE_KEY, validTheme);
    return ok();
  } catch (error) {
    if (error instanceof DOMException && error.name === "SecurityError") {
      return err(
        new ThemeStorageError(
          "Browser security policy prevents local storage access",
          {
            cause: error,
          }
        )
      );
    }

    return err(
      createFallbackError("Failed to set theme in local storage", {
        cause: error,
      })
    );
  }
}
