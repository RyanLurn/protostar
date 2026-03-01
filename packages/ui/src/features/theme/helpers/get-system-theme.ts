export function getSystemTheme() {
  if (typeof window === "undefined") {
    return "light";
  }

  const matchedTheme = window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
  return matchedTheme;
}
