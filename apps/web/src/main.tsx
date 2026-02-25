import { createRoot } from "react-dom/client";
import { StrictMode } from "react";

import "@/globals.css";
import { ModeToggle } from "@/components/utils/mode-toggle";
import { AppProviders } from "@/components/providers/app";
import { Toaster } from "@/components/ui/sonner";
import { App } from "@/app";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AppProviders>
      <Toaster position="top-center" closeButton richColors />
      <App />
      <ModeToggle className="fixed top-3 right-3 z-50" />
    </AppProviders>
  </StrictMode>
);
