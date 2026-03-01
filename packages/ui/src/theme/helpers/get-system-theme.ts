import type { Result } from "neverthrow";

import { ok } from "neverthrow";

import type { AppTheme } from "@/theme/schemas";

export function getSystemTheme(): Result<AppTheme, never> {
  if (typeof window === "undefined") {
    return ok("light");
  }

  const matchedTheme = window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
  return ok(matchedTheme);
}
