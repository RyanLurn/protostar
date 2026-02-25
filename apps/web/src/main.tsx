import { createRoot } from "react-dom/client";
import { StrictMode } from "react";

import { AppProviders } from "@/components/providers/app";
import "@/globals.css";
import { App } from "@/app";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AppProviders>
      <App />
    </AppProviders>
  </StrictMode>
);
