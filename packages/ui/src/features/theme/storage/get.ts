import { THEME_STORAGE_KEY } from "@/features/theme/constants";
import { UserThemeSchema } from "@/features/theme/schemas";

export function getStoredTheme() {
  if (typeof window === "undefined") {
    return "system";
  }

  try {
    const storedTheme = localStorage.getItem(THEME_STORAGE_KEY);
    const theme = UserThemeSchema.parse(storedTheme);
    return theme;
  } catch {
    return "system";
  }
}
