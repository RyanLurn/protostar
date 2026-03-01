import type { ReactNode } from "react";

import { useEffect, useState } from "react";
import { toast } from "sonner";

import { handleThemeChange } from "@/features/theme/helpers/handle-theme-change";
import { UserThemeSchema, type UserTheme } from "@/features/theme/schemas";
import { getSystemTheme } from "@/features/theme/helpers/get-system-theme";
import { getStoredTheme } from "@/features/theme/storage/get";
import { setStoredTheme } from "@/features/theme/storage/set";
import { ThemeContext } from "@/features/theme/context";

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [userTheme, setUserTheme] = useState<UserTheme>(getStoredTheme());

  useEffect(() => {
    if (userTheme !== "system") {
      return;
    }

    function systemThemeChangeHandler() {
      handleThemeChange({ userTheme: "system" });
    }

    const mediaQueryList = window.matchMedia("(prefers-color-scheme: dark)");
    mediaQueryList.addEventListener("change", systemThemeChangeHandler);

    return () => {
      mediaQueryList.removeEventListener("change", systemThemeChangeHandler);
    };
  }, [userTheme]);

  const appTheme = userTheme === "system" ? getSystemTheme() : userTheme;

  function setTheme(newUserTheme: UserTheme) {
    const newValidTheme = UserThemeSchema.parse(newUserTheme);
    handleThemeChange({ userTheme: newValidTheme });
    setUserTheme(newValidTheme);

    const setStoredThemeResult = setStoredTheme({ theme: newValidTheme });
    if (setStoredThemeResult.isErr()) {
      const error = setStoredThemeResult.error;

      if (error.code === "THEME_STORAGE_ERROR") {
        toast.warning(
          "We couldn't save your theme preference because of a browser security policy."
        );
      } else {
        toast.warning(
          "Something went wrong. We couldn't save your theme preference."
        );
      }
    }
  }

  return (
    <ThemeContext value={{ userTheme, appTheme, setTheme }}>
      {children}
    </ThemeContext>
  );
}
