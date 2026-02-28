import { createRoot } from "react-dom/client";
import { StrictMode } from "react";

import "@/globals.css";
import { AppProviders } from "@/components/providers/app";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AppProviders />
  </StrictMode>
);
