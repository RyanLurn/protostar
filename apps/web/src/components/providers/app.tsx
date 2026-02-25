import { ThemeProvider } from "@/components/providers/theme";

export function AppProviders({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider storageKey="vite-ui-theme" defaultTheme="dark">
      {children}
    </ThemeProvider>
  );
}
