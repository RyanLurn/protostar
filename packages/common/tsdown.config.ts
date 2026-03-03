import { defineConfig } from "tsdown";

export default defineConfig({
  entry: {
    ports: "./src/constants/ports.ts",
    brand: "./src/types/brand.ts",
  },
  dts: {
    sourcemap: true,
  },
});
