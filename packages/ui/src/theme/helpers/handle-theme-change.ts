import type { Result } from "neverthrow";

import { BrowserOnlyError } from "@protostar/error";
import { err, ok } from "neverthrow";

import { UserThemeSchema, type UserTheme } from "@/theme/schemas";
import { getSystemTheme } from "@/theme/helpers/get-system-theme";

export function handleThemeChange({
  userTheme,
}: {
  userTheme: UserTheme;
}): Result<void, BrowserOnlyError> {
  if (typeof window === "undefined") {
    return err(
      new BrowserOnlyError({
        context: {
          apis: [
            "document.documentElement.classList.remove()",
            "document.documentElement.classList.add()",
          ],
          feature: "handleThemeChange",
        },
      })
    );
  }

  const root = document.documentElement;
  root.classList.remove("light", "dark", "system");

  const validTheme = UserThemeSchema.parse(userTheme);
  if (validTheme === "system") {
    const systemTheme = getSystemTheme();
    root.classList.add(systemTheme, "system");
  } else {
    root.classList.add(validTheme);
  }

  return ok();
}
