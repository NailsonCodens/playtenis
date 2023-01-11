import path from "path";
// eslint-disable-next-line import/no-extraneous-dependencies
import { defineConfig } from "vitest/config";

export default defineConfig({
  resolve: {
    alias: {
      "@modules": path.resolve(__dirname, "./src/modules"),
      "@config": path.resolve(__dirname, "./src/config"),
      "@shared": path.resolve(__dirname, "./src/shared"),
      "@errors": path.resolve(__dirname, "./src/errors"),
      "@utils": path.resolve(__dirname, "./src/utils"),
      "@database": path.resolve(__dirname, "./src/database"),
    },
  },
  test: {
    globals: true,
    include: ["src/**/*.spec.ts", "test/**/*.spec.ts"],
    exclude: ["node_modules"],
  },
});
