import { createRoot } from "react-dom/client";
import { StrictMode } from "react";

import { ModeToggle } from "@/components/utils/mode-toggle";
import { AppProviders } from "@/components/providers/app";
import { App } from "@/app";
import "@/globals.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AppProviders>
      <App />
      <ModeToggle className="fixed top-3 right-3 z-50" />
    </AppProviders>
  </StrictMode>
);
