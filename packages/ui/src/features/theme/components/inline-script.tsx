import { ScriptOnce } from "@tanstack/react-router";

import { themeScript } from "@/features/theme/script";

export function InlineThemeScript() {
  return <ScriptOnce children={themeScript} />;
}
