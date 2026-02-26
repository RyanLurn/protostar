import { defineConfig } from "tsdown";

export default defineConfig({
  entry: ["./src/lib/rpc-client.ts"],
  dts: {
    sourcemap: true,
  },
});
