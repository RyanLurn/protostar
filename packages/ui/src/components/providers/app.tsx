import { RoutesProvider } from "@/components/providers/routes";
import { ThemeProvider } from "@/features/theme/provider";

export function AppProviders() {
  return (
    <ThemeProvider>
      <RoutesProvider />
    </ThemeProvider>
  );
}
