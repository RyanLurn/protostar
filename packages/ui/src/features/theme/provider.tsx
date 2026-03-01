import type { ReactNode } from "react";

import { useEffect, useState } from "react";

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
    setUserTheme(newValidTheme);
    setStoredTheme({ theme: newValidTheme });
    handleThemeChange({ userTheme: newValidTheme });
  }

  return (
    <ThemeContext value={{ userTheme, appTheme, setTheme }}>
      {children}
    </ThemeContext>
  );
}
