import { createRootRoute, Outlet } from "@tanstack/react-router";

import { ModeToggle } from "@/components/utils/mode-toggle";
import { AppProviders } from "@/components/providers/app";
import { Toaster } from "@/components/ui/sonner";

export const Route = createRootRoute({ component: RootLayout });

function RootLayout() {
  return (
    <AppProviders>
      <Toaster position="top-center" closeButton richColors />
      <Outlet />
      <ModeToggle className="fixed top-3 right-3 z-50" />
    </AppProviders>
  );
}
