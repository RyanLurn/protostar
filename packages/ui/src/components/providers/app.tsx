import { RoutesProvider } from "@/components/providers/routes";
import { ThemeProvider } from "@/components/providers/theme";

export function AppProviders() {
  return (
    <ThemeProvider storageKey="vite-ui-theme" defaultTheme="dark">
      <RoutesProvider />
    </ThemeProvider>
  );
}
