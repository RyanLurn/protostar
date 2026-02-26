import { hc } from "hono/client";

import type app from "@/index";

export type AppType = typeof app;
export const rpcClient = hc<AppType>("http://localhost:3000");
